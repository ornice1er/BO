import { Component, OnInit, TemplateRef } from '@angular/core';

import { MyToastr } from '../../../app.toastr';
import { FilesService } from '../../../core/_services/files.service';
import { PrestationService } from '../../../core/_services/prestation.service';
import { LocalService } from '../../../core/_services/storage_services/local.service';
import { globalName } from '../../../core/_utils/utils';

@Component({
  selector: 'ngx-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  error:any=""

  selected_data:any
  user:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  permissions:any[]=[]
  loading=false
  loading2=false
      constructor(
        private fileService:FilesService,
        private prestationService:PrestationService,
        
        private locService:LocalService,
      ){
  
      } 
  
    ngOnInit(): void {
      this.all();

      this.getPrestations()

      this.user=this.locService.getItem(globalName.user);
      this.permissions=this.user.roles[0].permissions;
    }
  
    all() {
      this.loading2=true;
      this.fileService.getAll().subscribe((res:any)=>{
        this.data=res
        this.data3=this.data
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getPrestations(){
      this.prestationService.getAll().subscribe((res:any)=>{
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
        this.fileService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            ref.close()
            this.all();
        },
        (err:any)=>{
            this.loading=false;
        })
  
  }
  update(value:any,ref:any) {
    this.loading=true;
      this.fileService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          ref.close()
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
    this.fileService.delete(this.selected_data.id).subscribe(
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

  sortBy(event:any){
    this.data3= this.data.filter((e:any)=>e.prestation_id ==event.target.value)
  }
}
