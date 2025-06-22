import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { MyToastr } from '../../../app.toastr';
import { FonctionAgentService } from '../../../core/_services/fonction-agent.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { globalName } from '../../../core/_utils/utils';

@Component({
  selector: 'ngx-post',
  templateUrl: './post.component.html',
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

      constructor(private fonctionAgentService:FonctionAgentService,private locService:LocalService,   config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
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
