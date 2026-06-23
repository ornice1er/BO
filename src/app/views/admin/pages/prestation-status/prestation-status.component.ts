import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EtapeService } from '../../../../core/services/etape.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { StatusService } from '../../../../core/services/status.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { PrestationStatusService } from '../../../../core/services/prestation-status.service';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-prestation-status',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    templateUrl: './prestation-status.component.html',
    styleUrl: './prestation-status.component.css'
})
export class PrestationStatusComponent {
isDtInitialized:boolean = false

  selected_data:any
  user:any
  data:any[]=[]
  status:any[]=[]
  prestations:any[]=[]
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
  selectedPrestationId: any = null;

  /** Copie des statuts d'une prestation vers une (ou plusieurs) autre(s) */
  copySourcePrestationId: any = null;
  copyTargetPrestationIds: any[] = [];

  /** Statuts associés à la prestation source (pour aperçu) */
  get copySourceStatuses(): any[] {
    if (!this.copySourcePrestationId) return [];
    return this.data.filter(
      (d: any) => (d?.prestation_id ?? d?.prestation?.id) === this.copySourcePrestationId
    );
  }

  /** Prestations sélectionnables comme cible (on exclut la source) */
  get copyTargetPrestations(): any[] {
    return this.prestations.filter((p: any) => p?.id !== this.copySourcePrestationId);
  }

  /** Données affichées, filtrées par prestation */
  get displayedData(): any[] {
    if (!this.selectedPrestationId) return this.data;
    return this.data.filter(
      (d: any) => (d?.prestation_id ?? d?.prestation?.id) === this.selectedPrestationId
    );
  }

  onPrestationFilterChange() {
    this.selectedId = null;
  }


         fileInput:any

      constructor(
        private statusService:StatusService,
        private prestationService:PrestationService,
        private psStatus:PrestationStatusService,
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

    this.getStatus()
    this.getPrestations()
    
    }


  getStatus() {
      this.loading2=true;
      this.statusService.getAll().subscribe((res:any)=>{
        this.status=res.data

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

 
 
  
    all() {
      this.loading2=true;
      this.psStatus.getAll().subscribe((res:any)=>{
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
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
  }

  copy(content:any){
    this.copySourcePrestationId = null;
    this.copyTargetPrestationIds = [];
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
  }

  /** Copie les statuts de la prestation source vers la/les prestation(s) cible(s) */
  copyStatuses(){
    if (!this.copySourcePrestationId) {
      this.toastrService.warning("Veuillez sélectionner la prestation source");
      return;
    }
    if (!this.copyTargetPrestationIds || this.copyTargetPrestationIds.length === 0) {
      this.toastrService.warning("Veuillez sélectionner au moins une prestation cible");
      return;
    }

    const statusIds = this.copySourceStatuses.map(
      (d:any) => d?.status_id ?? d?.status?.id
    ).filter((id:any) => id != null);

    if (statusIds.length === 0) {
      this.toastrService.warning("La prestation source ne possède aucun statut à copier");
      return;
    }

    this.loading = true;
    const requests = this.copyTargetPrestationIds.map((prestationId:any) =>
      this.psStatus.store({ prestation_id: prestationId, status_ids: statusIds })
    );

    forkJoin(requests).subscribe(
      (res:any)=>{
        this.loading = false;
        this.modalService.dismissAll();
        this.toastrService.success("Statuts copiés avec succès");
        this.all();
      },
      (err:any)=>{
        this.loading = false;
        AppErrorShow.showError("Copie échouée", err);
      }
    );
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
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


        this.psStatus.store(value).subscribe(
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



      this.psStatus.update(value,this.selected_data.id).subscribe(
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
          AppErrorShow.showError("Opération échouée", err)
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

  this.psStatus.search({search:this.search_text}).subscribe({
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
  this.selectedPrestationId = null;
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
