import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../core/utils/global-name';

@Component({
  selector: 'app-first-password',
  templateUrl: './first-password.component.html',
  imports: [LoadingComponent, FormsModule],
  styleUrls: ['../recovery-password/recovery-password.component.css']
})
export class FirstPasswordComponent {

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private lsService: LocalStorageService
  ) { }

  changePassword(value: any) {
    if (value.password !== value.password_confirmation) {
      this.toastr.error('Les deux mots de passe ne sont pas identiques', 'Première connexion');
      return;
    }
    this.loading = true;
    this.authService.changeFirstPassword(value).subscribe(
      (res: any) => {
        this.loading = false;
        // Lever le drapeau localement pour débloquer l'accès à l'application
        const user = this.lsService.get(GlobalName.userName);
        if (user) {
          user.first_signin = false;
          this.lsService.set(GlobalName.userName, user);
        }
        this.toastr.success('Mot de passe modifié avec succès', 'Première connexion');
        this.router.navigate(['/admin/dashboard']);
      },
      (err: any) => {
        this.loading = false;
        this.toastr.error(err.error?.message ?? 'Échec du changement de mot de passe', 'Première connexion');
      }
    );
  }
}
