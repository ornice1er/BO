import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from 'src/app/core/_services/department.service';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { globalName } from 'src/app/core/_utils/utils';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  selected_data:any
  data:any[]=[]
  user:any
  permissions:any[]=[]
  loading=false
  loading2=false
  error:any=""
  
      constructor(
        private departmentService:DepartmentService,
        config: NgbModalConfig, private modalService: NgbModal,
        private locService:LocalService,
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
      this.departmentService.getAll().subscribe((res:any)=>{
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
        this.departmentService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
          this.modalService.dismissAll()
            this.all();
            //MyToastr.make('success',"Type Entité","Enregistrement des types entités",this.toastrService)
        },
        (err:any)=>{
            this.loading=false;
        })
  
  }
  
  update(value:any) {
    this.loading=true;
    console.log(value)
      this.departmentService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
         this.modalService.dismissAll()
          this.all();
          //MyToastr.make('success',"Type Entité","Modification des types entités",this.toastrService)
  
      },
      (err:any)=>{
          this.loading=false;
      })
  
  }
  
  
  delete() {
      this.loading=true;
      if(confirm('Voulez vous supprimer cet élément')){
        this.departmentService.delete(this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.all();
          //MyToastr.make('success',"Type Entité","Suppression de type entité",this.toastrService)
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
