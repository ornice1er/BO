import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityService } from '../../../../core/services/entity.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { NgToggleComponent } from 'ng-toggle-button';

@Component({
  selector: 'ngx-prestation',
  templateUrl: './prestation.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule,NgToggleComponent],
    
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  isDtInitialized:boolean = false
  selected_data:any
  user:any
  roles:any
  data:any[]=[]
  permissions:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  data4:any[]=[]
  loading=false
  loading2=false
  error:any=""

  public exampleData:any[]=[];
  public options: any;
  public value: any[]=[];
  
      constructor(
        private unityAdminService:UnityAdminService,
        private prestationService:PrestationService,
        
         private locService:LocalStorageService,
        
        private entityService:EntityService,
        config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.roles=this.locService.get(GlobalName.role);
      this.all();
      this.getUnityAdmins()
      this.getEntities()
      this.getUnityAdminsAll()
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;

      this.options = {
        width: '500',
        multiple: true,
        tags: true
      };
    }
    all() {
      this.loading2=true;
      this.prestationService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;

      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getUnityAdmins(){
      this.unityAdminService.getPrincipal().subscribe((res:any)=>{
        this.data2=res

       
      },
      (error:any)=>{
        
      })
    }
    getUnityAdminsAll(){
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data4=res
        this.data4.forEach((el:any)=>{
          this.exampleData.push(  {
            id: el.id,
            text: el.libelle
          })
        });
      },
      (error:any)=>{
        
      })
    }
  
  
    checked(el:any){
      this.selected_data=el
    }
    getEntities(){
      this.entityService.getAll().subscribe((res:any)=>{
        this.data3=res
      },
      (error:any)=>{
        
      })
    }
    
    open(content:any) {
  
      this.modalService.open(
        content);
        
    }
  
    store(value:any) {
      this.loading=true;
        this.prestationService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
           this.modalService.dismissAll()
            this.all();
            this.toastrService.success("Enregistrement effectuée avec succès")

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any) {
    this.loading=true;
    console.log(value)
      this.prestationService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.modalService.dismissAll()
          this.all();
          this.toastrService.success("Modification effectuée avec succès")
  
      },
      (err:any)=>{
          this.loading=false;
      })
  
  }
  
  
  delete() {
      this.loading=true;
      if(confirm('Voulez vous supprimer cet élément')){
        this.prestationService.delete(this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.all();
          this.toastrService.success("Suppression effectuée avec succès")

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

  getContentType(type:any){

    switch (type) {
      case 0:
          return "A éditer";
        break;
        case 1:
          return "A Charger";
        break;
        case 2:
          return "Pas de contenu";
        break;
    
      default:
          return "A éditer";
        break;
    }
  }

  addSP(value:any){
    this.loading=true
    this.prestationService.saveStartPoint(value).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.all()
      this.loading=false

    },
    (error:any)=>{
      this.loading=false

    })
  }
}
