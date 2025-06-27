import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { FonctionAgentService } from '../../../../core/services/fonction-agent.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'ngx-post',
  templateUrl: './post.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  selected_data:any
  user:any
  data:any[]=[]
  permissions:any[]=[]
  loading=false
  loading2=false

  error:any=""

      constructor(private fonctionAgentService:FonctionAgentService, private locService:LocalStorageService,   config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
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
      this.fonctionAgentService.getAll().subscribe((res:any)=>{
        this.data=res
        this.loading2=false;
        this.modalService.dismissAll()
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
        this.fonctionAgentService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
           
            this.all();
            this.toastrService.success ("Modification effectuée avec succès")

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

update(value:any) {
  this.loading=true;
    this.fonctionAgentService.update(value,this.selected_data.id).subscribe(
        (res:any)=>{
        this.loading=false;
        this.all();
        
        this.toastrService.success("Enregistrement effectuée avec succès")

    },
    (err:any)=>{
        this.loading=false;
    })

}

delete() {
this.loading=true;
if(confirm('Voulez vous supprimer cet élément')){
  this.fonctionAgentService.delete(this.selected_data.id).subscribe(
    (res:any)=>{
    this.loading=false;
    this.all();
    this.toastrService.success("Suppression de type entité")
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
