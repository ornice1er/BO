import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { MyToastr } from '../../../app.toastr';
import { EntityTypeService } from '../../../core/_services/entity_type.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { UnityAdminTypeService } from '../../../core/_services/unity_admin_type.service';
import { globalName } from '../../../core/_utils/utils';

@Component({
  selector: 'ngx-unity-admin-type',
  templateUrl: './unity-admin-type.component.html',
  styleUrls: ['./unity-admin-type.component.css']
})
export class UnityAdminTypeComponent implements OnInit {
  selected_data:any
  user:any
  data:any[]=[]
  permissions:any[]=[]
  loading=false
  loading2=false
  error:any=""

      constructor(
        private unityAdminTypeService:UnityAdminTypeService,
        
        private locService:LocalService,
        config: NgbModalConfig, private modalService: NgbModal


        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.all();
      this.user=this.locService.getItem(globalName.user);
    this.permissions=this.user.roles[0].permissions;
    }
  
    all() {
      this.loading2=true;
      this.unityAdminTypeService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
  
    checked(el:any){
      this.selected_data=el
    }
  
    
    open(content:any) {
      this.modalService.open(
        content);
        
    }
  
    store(value:any) {
      this.loading=true;
        this.unityAdminTypeService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            this.all();
            this.modalService.dismissAll()
            //MyToastr.make('success',"Type Unité Admin","Enregistrement effectué avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any,ref:any) {
    this.loading=true;
      this.unityAdminTypeService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          ref.close()
          this.all();
          //MyToastr.make('success',"Type Unité Admin ","Modification effectuée avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}

delete() {
  this.loading=true;
  if(confirm('Voulez vous supprimer cet élément')){
    this.unityAdminTypeService.delete(this.selected_data.id).subscribe(
      (res:any)=>{
      this.loading=false;
      this.all();
      //MyToastr.make('success',"Type Unité Admin","Suppression de type entité",this.toastrService)
  },
  (err:any)=>{
      this.loading=false;
  })
  }

}

  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }
}
