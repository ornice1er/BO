import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { DepartmentService } from '../../../../core/services/department.service';
import { EntityService } from '../../../../core/services/entity.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { UnityAdminTypeService } from '../../../../core/services/unity_admin_type.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { NgToggleComponent } from 'ng-toggle-button';

@Component({
  selector: 'ngx-unity-admin',
  templateUrl: './unity-admin.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule,NgToggleComponent],
    
  styleUrls: ['./unity-admin.component.css']
})
export class UnityAdminComponent implements OnInit {
  isDtInitialized:boolean = false

  selected_data:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  departments:any[]=[]
  loading=false
  loading2=false
  user:any
  error:any=""
  ua_department=false

permissions=[]
      constructor(
        private unityAdminService:UnityAdminService,
        private unityAdminTypeService:UnityAdminTypeService,
        private entityService:EntityService,  
         private locService:LocalStorageService,
        private departmentService:DepartmentService,        
        config: NgbModalConfig, 
        private modalService: NgbModal

        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.all();
      this.getEntities()
      this.getTypeUnityAdmin()
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
      this.getDepartments();
    }

    all() {
      this.loading2=true;
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
    getDepartments() {
      this.loading2=true;
      this.departmentService.getAll().subscribe((res:any)=>{
        this.departments=res
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getTypeUnityAdmin(){
      this.unityAdminTypeService.getAll().subscribe((res:any)=>{
        this.data2=res
      },
      (error:any)=>{
        
      })
    }

    getEntities(){
      this.entityService.getAll().subscribe((res:any)=>{
        this.data3=res
      },
      (error:any)=>{
        
      })
    }
  
    checked(el:any){
      this.selected_data=el

      if(this.selected_data.department_id != null)this.ua_department=true
    }
  
    
    open(content:any) {
    this.modalService.open(content)
        
    }
  
    store(value:any) {
      this.loading=true;

      delete value.ua_department
        this.unityAdminService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
              this.modalService.dismissAll()
            this.all();
            //MyToastr.make('success',"Gestion des unités administratives ","Modification effectuée avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  }
  update(value:any) {
    this.loading=true;
    delete value.ua_department

      this.unityAdminService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
            this.modalService.dismissAll()
          this.all();
          //MyToastr.make('success',"Gestion des unités administratives ","Enregistrement effectuée avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}

delete() {
  this.loading=true;
  if(confirm('Voulez vous supprimer cet élément')){
    this.unityAdminService.delete(this.selected_data.id).subscribe(
      (res:any)=>{
      this.loading=false;
      this.all();
      //MyToastr.make('success',"Gestion des unités administratives","Suppression de type entité",this.toastrService)
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

  changed(event:any){
    //this.ua_department=!this.ua_department
  }
}
