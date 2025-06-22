import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyToastr } from '../../../app.toastr';
import { AuthService } from '../../../core/_services/auth.service';
import { OfficerService } from '../../../core/_services/officer.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { globalName } from '../../../core/_utils/utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  role=""
  error=""
  user:any
  loading=false;
  selected_data:any
  fileUploaded:File | undefined
  token:any
  active:any=1

  constructor(
    private localService:LocalService, 
    private offcerService:OfficerService, 
    private authService: AuthService,
    private toastrService:ToastrService,
    private router:ActivatedRoute,
    private auth:AuthService,
    private router2:Router
    ) { }

  ngOnInit(): void {
   if(this.router.snapshot.paramMap.get('token')){
    this.token=this.router.snapshot.paramMap.get('token')
    this.active=3
   }
    this.role= this.localService.getItem(globalName.role)
    this.user= this.localService.getItem(globalName.user)
    this.selected_data=this.user.agent;
  
  }

  update(value:any) {
    this.loading=true;
      this.offcerService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.toastrService.success("Modification effectuée avec succès")

      },
      (err:any)=>{
          this.loading=false;
      })

}
upload(event:any){
  this.fileUploaded=event.target.files[0]
  
}

changePassword(value:any,form:NgForm){
  this.loading=true;
  var formData= new FormData();
  formData.append('old_password',value.old_password)
  formData.append('new_password',value.password)
  formData.append('confirm_password',value.c_password)
  this.authService.changePassword(formData).subscribe(
      (res:any)=>{
      this.loading=false;
      this.toastrService.success("Modification effectuée avec succès")
      form.resetForm()

      this.auth
        .logout()
        .subscribe((res:any) => {
          console.log(res)
          if (res) {
            localStorage.removeItem(globalName.token)
        localStorage.removeItem(globalName.user)
        localStorage.removeItem(globalName.role)
        this.router2.navigate(['/admin'])
          }
          
        },(err:any) => {
          console.log(err)
         
          });
  },
  (err:any)=>{
      this.loading=false;
  })
}
generateCode(){

  this.authService.sendLink().subscribe(
    (res:any)=>{
    this.loading=false;
    this.toastrService.success("Veuillez consultez votre boïte mail!")

},
(err:any)=>{
    this.loading=false;
})

}
changeCode(value:any,codeForm:any){

  if (value.c_password != value.password) {
    this.toastrService.error('Code non identique')
  }
  this.loading=true;
  var formData= new FormData();
  formData.append('password',value.password)
  formData.append('c_password',value.c_password)
  formData.append('token',this.token)
  this.authService.changeCode(formData).subscribe(
      (res:any)=>{
      this.loading=false;
      codeForm.reset()
      this.active=1
      this.toastrService.success("Code de signature modifié avec succès")
      
  },
  (err:any)=>{
      this.loading=false;
  })
}
}
