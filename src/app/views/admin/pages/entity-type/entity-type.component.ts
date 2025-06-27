import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityTypeService } from '../../../../core/services/entity_type.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'ngx-entity-type',
  templateUrl: './entity-type.component.html',
      standalone:true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  
  styleUrls: ['./entity-type.component.css']
})
export class EntityTypeComponent implements OnInit {
selected_data:any
data:any[]=[]
user:any
permissions:any[]=[]
loading=false
loading2=false
error:any=""

    constructor(
      private entityTypeService:EntityTypeService,
      config: NgbModalConfig, private modalService: NgbModal,
       private locService:LocalStorageService,
      ){
        config.backdrop = 'static';
        config.keyboard = false;
    } 

  ngOnInit(): void {
    this.all();
    this.user=this.locService.get(GlobalName.userName);
    this.permissions=this.user.roles[0].permissions;
  }

  all() {
    this.loading2=true;
    this.entityTypeService.getAll().subscribe((res:any)=>{
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
      this.entityTypeService.store(value).subscribe(
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
    this.entityTypeService.update(value,this.selected_data.id).subscribe(
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
      this.entityTypeService.delete(this.selected_data.id).subscribe(
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
