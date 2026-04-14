import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { AppRedirect } from '../../../core/utils/app-redirect';

@Component({
  selector: 'app-ldap-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ldap-callback-wrap">
      <div class="ldap-callback-card">
        <div *ngIf="!error" class="ldap-spinner-wrap">
          <div class="ldap-spinner"></div>
          <p class="ldap-msg">Authentification en cours…</p>
        </div>
        <div *ngIf="error" class="ldap-error-wrap">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="ldap-error-msg">{{ error }}</p>
          <button class="ldap-back-btn" (click)="goToLogin()">Retour à la connexion</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ldap-callback-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f3f4f6;
    }
    .ldap-callback-card {
      background: white;
      border-radius: 16px;
      padding: 2.5rem 3rem;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      text-align: center;
      min-width: 280px;
    }
    .ldap-spinner-wrap { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .ldap-spinner {
      width: 40px; height: 40px;
      border: 3px solid #e5e7eb;
      border-top-color: #0A3764;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ldap-msg { color: #6b7280; font-size: 0.9rem; margin: 0; }
    .ldap-error-wrap { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .ldap-error-msg { color: #374151; font-size: 0.9rem; margin: 0; }
    .ldap-back-btn {
      padding: 0.5rem 1.25rem;
      background: #0A3764; color: white;
      border: none; border-radius: 8px;
      font-size: 0.85rem; font-weight: 600;
      cursor: pointer; transition: background 0.2s;
    }
    .ldap-back-btn:hover { background: #062848; }
  `]
})
export class LdapCallbackComponent implements OnInit {
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private lsService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const errorParam = this.route.snapshot.queryParamMap.get('error');

    if (errorParam) {
      this.error = 'Authentification LDAP refusée. Veuillez réessayer.';
      return;
    }

    if (!code) {
      this.error = 'Code d\'autorisation manquant. Veuillez réessayer.';
      return;
    }

    const redirectUri = `${window.location.origin}/callback`;

    this.authService.loginLdap(code, redirectUri).subscribe({
      next: (res: any) => {
        this.lsService.set(GlobalName.tokenName, res.data?.access_token);
        this.lsService.set(GlobalName.refreshTokenName, res.data?.refresh_token);
        this.lsService.set(GlobalName.expireIn, res.data?.expire_in);
        this.lsService.set(GlobalName.features, res.data?.features);

        this.authService.me().subscribe({
          next: (meRes: any) => {
            this.lsService.set(GlobalName.userName, meRes.data);
            const url = AppRedirect.redirectLogin(this.lsService);
            this.router.navigate([url]);
            this.toastr.success('Connexion réussie', 'Connexion');
          },
          error: (err: any) => {
            this.error = err.error?.message || 'Erreur lors de la récupération du profil.';
          }
        });
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Erreur lors de l\'authentification LDAP.';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
