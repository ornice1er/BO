import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityService } from '../../../../core/services/entity.service';
import { EntityTypeService } from '../../../../core/services/entity_type.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'ngx-entity',
  templateUrl: './entity.component.html',
      standalone:true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  error:any=""
  selected_data:any
  user:any
  data:any[]=[]
  permissions:any[]=[]
  data2:any[]=[]
  loading=false
  loading2=false
      constructor(private entityService:EntityService,private entitytypeService:EntityTypeService,
         private locService:LocalStorageService,
        ){
  
      } 
  
    ngOnInit(): void {
      this.all();
      this.getTypeEntity()
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
    }
  
    all() {
      this.loading2=true;
      this.entityService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getTypeEntity(){
      this.entitytypeService.getAll().subscribe((res:any)=>{
        this.data2=res
      },
      (error:any)=>{
        
      })
    }
  
    checked(el:any){
      this.selected_data=el
    }
  
    
    open(content:any) {
      //this.dialogService.open(
  //      dialog);
        
    }
  
    store(value:any,ref:any) {
      this.loading=true;
        this.entityService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            ref.close()
            this.all();
            //MyToastr.make('success',"Entité","Enregistrement effectuté avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any,ref:any) {
    this.loading=true;
      this.entityService.update(value, this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          ref.close()
          this.all();
          //MyToastr.make('success',"Entité","Enregistrement effectuté avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}


  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  delete() {
    this.loading=true;
    if(confirm('Voulez vous supprimer cet élément')){
      this.entityService.delete(this.selected_data.id).subscribe(
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
}
