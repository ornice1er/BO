import { Component } from '@angular/core';
import { EtapePrestationStatusService } from '../../../../core/services/etape-prestation-status.service';
import { StatusService } from '../../../../core/services/status.service';
import { PrestationStatusService } from '../../../../core/services/prestation-status.service';
import { EtapeService } from '../../../../core/services/etape.service';
import { CommonModule, formatDate } from '@angular/common';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { PrestationService } from '../../../../core/services/prestation.service';
import { ADDING_FIELDS, BANETTES, EVENTS } from '../../../../core/utils/DATA';

@Component({
    selector: 'app-etape-prestation-status',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    templateUrl: './etape-prestation-status.component.html',
    styleUrl: './etape-prestation-status.component.css'
})
export class EtapePrestationStatusComponent {
isDtInitialized:boolean = false

  selected_data:any
  user:any
  data:any[]=[]
  etapes:any[]=[]
  prestations:any[]=[]
  prestationStatus:any[]=[]
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

  addingFields:any[]=ADDING_FIELDS

  events:any[]=EVENTS

  banettes:any[]=BANETTES



      constructor(
        private ePSService:EtapePrestationStatusService,
        private pStatusService:PrestationStatusService,
        private prestationService:PrestationService,
        private etapeService:EtapeService,
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

    this.getEtapes()
    this.getPrestations()
    this.getPrestationStatus()
    }


    getEtapes() {
      this.loading2=true;
      this.etapeService.getAll().subscribe((res:any)=>{
        this.etapes=res.data
      },
      (error:any)=>{
        this.loading2=false;
      })
    }
  getPrestations() {
      this.loading2=true;
      this.prestationService.getAll().subscribe((res:any)=>{
        this.prestations=res.data
      },
      (error:any)=>{
        this.loading2=false;
      })
    }

    getPrestationStatus() {
      this.loading2=true;
      this.pStatusService.getAll().subscribe((res:any)=>{
        this.prestationStatus=res.data
      },
      (error:any)=>{
        this.loading2=false;
      })
    }

 
  
    all() {
      this.loading2=true;
      this.ePSService.getAll().subscribe((res:any)=>{
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

        this.ePSService.store(value).subscribe(
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


      this.ePSService.update(value,this.selected_data.id).subscribe(
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
    this.ePSService.delete(this.selected_data.id).subscribe(
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
        this.ePSService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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
  const localResults = this.data.filter((d:any) => d.name?.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.ePSService.search({search:this.search_text}).subscribe({
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

  getName2(key:any,step:any){
    switch (step) {
    case 'adding_fields':
      return this.addingFields.find((el:any)=>el.key==key)?.value
    break;
    case 'events':
      return this.events.find((el:any)=>el.key==key)?.value
    break;
    case 'banettes':
    return this.banettes.find((el:any)=>el.key==key)?.value
    break;
      default:
        return 'Non défini'
        break;
    }
  }
}
