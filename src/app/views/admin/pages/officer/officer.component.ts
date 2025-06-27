import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { FonctionAgentService } from '../../../../core/services/fonction-agent.service';
import { OfficerService } from '../../../../core/services/officer.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'ngx-officer',
  templateUrl: './officer.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./officer.component.css']
})
export class OfficerComponent implements OnInit {
  isDtInitialized:boolean = false

  selected_data:any
  user:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  permissions:any[]=[]
  loading=false
  loading2=false
  error:any=""

      constructor(
        private offcerService:OfficerService,
        private unityAdminService:UnityAdminService,
        
        private fonctionAgentService:FonctionAgentService,
         private locService:LocalStorageService,
        config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
      ){
        config.backdrop = 'static';
        config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.all();
      this.getFonctionAgent()
      this.geteUnityAdmin()
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
    }
 
  
    all() {
      this.loading2=true;
      this.offcerService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;

      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    geteUnityAdmin(){
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data2=res
      },
      (error:any)=>{
        
      })
    }

    getFonctionAgent(){
      this.fonctionAgentService.getAll().subscribe((res:any)=>{
        this.data3=res
      },
      (error:any)=>{
        
      })
    }
  
    checked(el:any){
      this.selected_data=el
    }
  
    
    open(content:any) {
      this.modalService.open(content)
        
    }
  
    store(value:any) {
      this.loading=true;
        this.offcerService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            this.modalService.dismissAll()
            this.all();
            //MyToastr.make('success',"Gestion des agents ","Enrehistrement effectué avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any) {
    this.loading=true;
      this.offcerService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.modalService.dismissAll()

          this.all();
          //MyToastr.make('success',"Gestion des agents ","Modification effectuée avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}

delete() {
  this.loading=true;
  if(confirm('Voulez vous supprimer cet élément')){
    this.offcerService.delete(this.selected_data.id).subscribe(
      (res:any)=>{
      this.loading=false;
      this.all();
      //MyToastr.make('success',"Gestion des agents","Suppression de type entité",this.toastrService)
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
