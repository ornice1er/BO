import { Component } from '@angular/core';
import { StatusService } from '../../../../core/services/status.service';
import { formatDate } from '@angular/common';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
isDtInitialized:boolean = false

  selected_data:any
  user:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  uas:any[]=[]
  permissions:any[]=[]
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

      constructor(
        private statusService:StatusService,
        private locService:LocalStorageService,
        config: NgbModalConfig, 
        private modalService: NgbModal,
        private toastrService:ToastrService
      ){
        config.backdrop = 'static';
        config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.all();
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    }
 
  
    all() {
      this.loading2=true;
      this.statusService.getAll().subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
                this.selectedId=null


      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

 
  
    checked(el:any){
      this.selected_data=el
      this.uas=this.data2.find((ea:any)=> ea.id == el.entite_admin_id)?.uas

    }
  
    

    uploadFile(ev:any){
      if (ev.target.files.length!=0) {
        this.fileInput=ev.target.files[0]
      }
    }
  
    
add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
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
      let formData = new FormData()
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key];
         formData.append(key,element) 
        }
      }

      formData.append('file',this.fileInput)

      

        this.statusService.store(formData).subscribe(
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

      if (this.fileInput==undefined) {
        this.toastrService.warning('Fichier requis')
        return
      }
      let formData = new FormData()
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key];
         formData.append(key,element) 
        }
      }

      formData.append('file',this.fileInput)

      this.statusService.update(formData,this.selected_data.id).subscribe(
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
    this.statusService.delete(this.selected_data.id).subscribe(
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
        this.statusService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
          this.toastrService.success(res.message)
          this.loading=false
          this.all()
      },
      (err:any)=>{
        this.loading=false
        console.log(err)
          AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
      })
  }


 onSearchChange() {
  const localResults = this.data.filter((d:any) => d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.statusService.search({search:this.search_text}).subscribe({
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
}
