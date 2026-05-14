import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ProjectService } from '../../../../core/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { EntityService } from '../../../../core/services/entity.service';
import { FonctionAgentService } from '../../../../core/services/fonction-agent.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { ConfigService } from '../../../../core/utils/config-service';
import { Router } from '@angular/router';
import { PrestationService } from '../../../../core/services/prestation.service';

@Component({
    selector: 'app-project',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    templateUrl: './project.component.html',
    styleUrl: './project.component.css'
})
export class ProjectComponent {
  isDtInitialized:boolean = false

  selected_data:any
  user:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  uas:any[]=[]
  prestationsList:any[]=[]
  permissions:any[]=[]
  prestationSelected:any[]=[]
  loading=false
  loading2=false
  error:any=""
  buttonsPermission :any|undefined;
is_active=false
search_text:any=""
remoteSearchData: any[] = []
  pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
         selectedFilter = '';


         fileInput:any
         fileInput2:any

      constructor(
        private prestationService:PrestationService,
        private projectService:ProjectService,
        private entityAdminService:EntityService,
        private router:Router,

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
      this.getPrestations();
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    }
 
  
     getPrestations() {
      this.loading2=true;
      this.prestationService.getAll().subscribe((res:any)=>{
        this.prestationsList=res.data
        this.loading2=false;
      },
      (error:any)=>{
        this.loading2=false;
      })
    }
  
    all() {
      this.loading2=true;
      this.projectService.getAll().subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
                this.selectedId=null


      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    loadUas(ev :any){
      this.uas=this.data2.find((ea:any)=> ea.id == ev)?.uas
      console.log(this.uas,ev)
    }

    getEntityAdmin(){
      this.entityAdminService.getAll().subscribe((res:any)=>{
        this.data2=res.data
      },
      (error:any)=>{
        
      })
    }

    getFonctionAgent(){
      this.fonctionAgentService.getAll().subscribe((res:any)=>{
        this.data3=res.data
      },
      (error:any)=>{
        
      })
    }
  
    checked(el:any){
      this.selected_data=el
      this.uas=this.data2.find((ea:any)=> ea.id == el.entite_admin_id)?.uas
      this.prestationSelected= this.getJson(el.prestations)
    }
  
    

    uploadFile(ev:any){
      if (ev.target.files.length!=0) {
        this.fileInput=ev.target.files[0]
      }
    }

     uploadFile2(ev:any){
      if (ev.target.files.length!=0) {
        this.fileInput2=ev.target.files[0]
      }
    }
  
    
add(content:any){
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
  }


  show(){
    if(!this.verifyIfElementChecked()) return ;
    this.router.navigate(['/admin/projects/'+this.selected_data?.id])
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});

  }

  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }
  
    store(value:any) {
      this.loading=true;

      let date_start = formatDate(value.date_start,'yyyy-MM-dd','en_US');
      let date_end =formatDate(value.date_end,'yyyy-MM-dd','en_US');

      if (date_start > date_end) {
         this.toastrService.warning('Date fin ne peut être antérieur à la date début')
        return
      }

      if (this.fileInput==undefined) {
        this.toastrService.warning('Fichier requis')
        return
      }

     
  let formData = new FormData();

for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];

        if (key === 'prestations') {
            // S'assurer que c'est bien un array avant stringify
            const prestations = Array.isArray(element) ? element : [element];
            formData.append(key, JSON.stringify(prestations)); // ✅ envoie ["PS00608","PS00609"]
        } else if (element !== null && element !== undefined) {
            formData.append(key, element);
        }
    }
}
      formData.append('file',this.fileInput)

      

        this.projectService.store(formData).subscribe(
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


      let date_start = formatDate(value.date_start,'yyyy-MM-dd','en_US');
      let date_end =formatDate(value.date_end,'yyyy-MM-dd','en_US');

      if (date_start > date_end) {
         this.toastrService.warning('Date fin ne peut être antérieur à la date début')
        return
      }

    

     
  let formData = new FormData();

for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];

        if (key === 'prestations') {
            // S'assurer que c'est bien un array avant stringify
            const prestations = Array.isArray(element) ? element : [element];
            formData.append(key, JSON.stringify(prestations)); // ✅ envoie ["PS00608","PS00609"]
        } else if (element !== null && element !== undefined) {
            formData.append(key, element);
        }
    }
}

        if (this.fileInput!=undefined) {
             formData.append('file',this.fileInput)

      }

       if (this.fileInput2!=undefined) {
             formData.append('closing_filename',this.fileInput2)

      }


      this.projectService.update(formData,this.selected_data.id).subscribe(
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

async delete() {
  this.loading=true;
  const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Voulez vous supprimer cet élément');
  if (result.isConfirmed) {
    this.projectService.delete(this.selected_data.id).subscribe(
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


  setStatus(value:any){

    this.toastrService.warning("Opération en cours")
      this.loading=true
        this.projectService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.loading=false
          this.all()
      },
      (err:any)=>{
        this.loading=false
        console.log(err)
          AppErrorShow.showError("Opération échouée", err)
      })
  }


 onSearchChange() {
  const localResults = this.data.filter((d:any) => d.title?.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.projectService.search({search:this.search_text}).subscribe({
    next: (result:any) => {
      this.remoteSearchData = result.data;
      this.data = this.remoteSearchData;
      this.pg.p=1
      this.pg.total=this.data.length
      this.loading = false;
      console.log(this.remoteSearchData);
    },
    error: (err:any) => {
      console.error(err);
      this.loading = false;
    }
  });
}

resetSearch() {
  this.search_text = '';
  this.isPaginate=true;
  this.pg.p = 1; // reset pagination si utilisée
  this.all(); // méthode pour recharger les données initiales
}


  getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
      this.all();
    } else {
          this.pg.p=event
    }
  }

  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  getLink(filename:any){
    return ConfigService.toFile(`storage/${filename}`)
  }

  getJson(data:any){
    return JSON.parse(data)
  }
}
