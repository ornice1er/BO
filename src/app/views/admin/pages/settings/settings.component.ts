import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AuthService } from '../../../../core/services/auth.service';
import { OfficerService } from '../../../../core/services/officer.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  
          standalone:true,
          imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
      
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
  buttonsPermission :any|undefined;

  constructor(
    private localService:LocalStorageService, 
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
    this.role= this.localService.get(GlobalName.role)
    this.user= this.localService.get(GlobalName.user)
    this.selected_data=this.user.agent;
     this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  
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
            localStorage.removeItem(GlobalName.token)
        localStorage.removeItem(GlobalName.user)
        localStorage.removeItem(GlobalName.role)
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
