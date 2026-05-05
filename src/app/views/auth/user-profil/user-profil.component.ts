import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { FileService } from '../../../core/services/file.service';
import { UserSettingService } from '../../../core/services/user-setting.service';
import { AppErrorShow } from '../../../core/utils/app-error-show';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-user-profil',
    templateUrl: './user-profil.component.html',
    imports: [LoadingComponent, CommonModule, FormsModule],
    styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  fileSrc: any = 'https://placehold.co/200x200';
  loading = false;
  loadingUser = false;
  fileInput: any;
  user: any;
  activeTab = 0;
  tag = 'admin-user-account';

  constructor(
    private spinnerService: NgxSpinnerService,
    private fileService: FileService,
    private authService: AuthService,
    private usService: UserSettingService,
    private lsService: LocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = this.lsService.get(GlobalName.userName);
    this.loadMe();
  }

  loadMe(): void {
    this.loadingUser = true;
    this.authService.me().subscribe({
      next: (res: any) => {
        this.loadingUser = false;
        this.user = res.data ?? res;
        this.lsService.set(GlobalName.userName, this.user);
        if (this.user?.user_setting?.signature) {
          this.getFile('local', 'director', this.user.user_setting.signature);
        }
      },
      error: () => {
        this.loadingUser = false;
      }
    });
  }

  getInitials(): string {
    const last = this.user?.agent?.lastname?.charAt(0) ?? this.user?.email?.charAt(0) ?? '?';
    const first = this.user?.agent?.firstname?.charAt(0) ?? '';
    return (last + first).toUpperCase();
  }

  getFile(disk: any, folder: any, filename: any): void {
    this.spinnerService.show();
    this.fileService.get({ folder, disk, filename }).subscribe({
      next: (res: any) => {
        this.spinnerService.hide();
        this.fileSrc = res[0];
      },
      error: (err: any) => {
        this.spinnerService.hide();
        AppErrorShow.showError('Profil utilisateur connecté', err);
      }
    });
  }

  update(value: any): void {
    this.loading = true;
    this.authService.update(value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.user = res.data ?? res;
        this.lsService.set(GlobalName.userName, this.user);
        this.toastr.success('Informations mises à jour', 'Mon profil');
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Sauvegarde échouée', 'Mon profil');
      }
    });
  }

  changePassword(value: any): void {
    this.loading = true;
    this.authService.changePassword(value).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastr.success(res.message, 'Mon profil');
        this.logout();
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Changement de mot de passe échoué', 'Mon profil');
      }
    });
  }

  readFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.fileInput);
    reader.onload = (event) => {
      this.fileSrc = event.target?.result;
    };
  }

  loadImg(event: any): void {
    if (event.target.files.length !== 0) {
      this.fileInput = event.target.files[0];
      this.readFile();
    }
  }

  storeSign(value: any): void {
    const formData = new FormData();
    if (this.fileInput !== undefined) {
      formData.append('signature', this.fileInput);
    }
    this.loading = true;
    const action = this.user?.user_setting != null
      ? this.usService.update(this.user.id, formData)
      : this.usService.store(formData);

    action.subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastr.success(res.message, 'Mon profil');
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Chargement de la signature échoué', 'Mon profil');
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.lsService.remove(GlobalName.tokenName);
        this.lsService.remove(GlobalName.refreshTokenName);
        this.lsService.remove(GlobalName.expireIn);
        this.router.navigate(['/admin/login']);
        this.toastr.success('Déconnexion réussie', 'Connexion');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Déconnexion échouée', 'Connexion');
      }
    });
  }
}
