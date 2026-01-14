import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { AppRedirect } from '../../../core/utils/app-redirect';
import { GlobalName } from '../../../core/utils/global-name';
import { LocalStorageService } from '../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  imports:[ CommonModule,LoadingComponent,FormsModule,RouterModule,ReactiveFormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  loading=false
 
  constructor(
    private authService:AuthService,
    private lsService:LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
    ) { 
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      device: ['web', []]
    });
    }

  ngOnInit(): void {
  }

    togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


    get email() {
    return this.loginForm?.get('email');
  }

  get password() {
    return this.loginForm?.get('password');
  }

  login(){

    this.loading=true
    this.authService.login(this.loginForm?.value).subscribe((res:any)=>{

      this.lsService.set(GlobalName.tokenName,res.data?.access_token)
      this.lsService.set(GlobalName.refreshTokenName,res.data?.refresh_token)
      this.lsService.set(GlobalName.expireIn,res.data?.expire_in);
      this.lsService.set(GlobalName.features,res.data?.features);
     this.authService.me().subscribe((res:any)=>{
      this.loading=false
      this.lsService.set(GlobalName.userName,res.data);
    //  this.lsService.set(GlobalName.features,res.data?.features);
     // this.router.navigate(['/admin/dashboard'])
     let url=AppRedirect.redirectLogin(this.lsService)

     this.router.navigate([url]);
      this.toastr.success('Connexion réussie', 'Connexion');
     },
     (err:any)=>{
      this.loading=false
      this.toastr.error(err.error?.message, 'Connexion');

    })
     
    },
    (err:any)=>{
      this.loading=false
      this.toastr.error(err.error?.message, 'Connexion');

    });
  }

}
