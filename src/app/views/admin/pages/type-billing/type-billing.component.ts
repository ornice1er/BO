import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { TypeBillingService } from 'src/app/core/_services/type-billing.service';
import { globalName } from 'src/app/core/_utils/utils';

@Component({
  selector: 'app-type-billing',
  templateUrl: './type-billing.component.html',
  styleUrls: ['./type-billing.component.css']
})
export class TypeBillingComponent implements OnInit {
  selected_data:any
  data:any[]=[]
  user:any
  permissions:any[]=[]
  loading=false
  loading2=false
  error:any=""
  
      constructor(
        private typeBilling:TypeBillingService,
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
      this.typeBilling.getAll().subscribe((res:any)=>{
        this.data=res.data
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
        this.typeBilling.store(value).subscribe(
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
      this.typeBilling.update(value,this.selected_data.id).subscribe(
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
        this.typeBilling.delete(this.selected_data.id).subscribe(
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
