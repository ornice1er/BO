import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EtapeService } from '../../../../core/services/etape.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { StatusService } from '../../../../core/services/status.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { WorkflowService } from '../../../../core/services/workflow.service';
import { PrestationStatusService } from '../../../../core/services/prestation-status.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { TransitionCondition } from '../../../../core/Models/interface.model';

@Component({
    selector: 'app-workflow',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    templateUrl: './workflow.component.html',
    styleUrl: './workflow.component.css'
})
export class WorkflowComponent {
  isDtInitialized: boolean = false;

  selected_data: any;
  user: any;
  data: any[] = [];
  prestations: any[] = [];
  etapes: any[] = [];
  statuses: any[] = [];
  filteredStatuses: any[] = [];
  permissions: any[] = [];

  loading = false;
  loading2 = false;
  error: any = '';
  buttonsPermission: any | undefined;
  search_text: any = '';
  remoteSearchData: any[] = [];
  pg = { pageSize: 10, p: 1, total: 0 };
  isPaginate = true;
  selectedId: number | null = null;
  selectedFilter = '';

  conditionTypes: { value: TransitionCondition; label: string }[] = [
    { value: 'auto',          label: 'Automatique' },
    { value: 'validation',    label: 'Validation' },
    { value: 'rejet',         label: 'Rejet' },
    { value: 'complement',    label: 'Complément' },
    { value: 'signature',     label: 'Signature' },
    { value: 'cloture',       label: 'Clôture' },
    { value: 'paraphe',       label: 'Paraphe' },
    { value: 'prevalidation', label: 'Pré-validation' },
    { value: 'choix_sortie',  label: 'Choix sortie' },
  ];

  constructor(
    private wService: WorkflowService,
    private etapeService: EtapeService,
    private prestationService: PrestationService,
    private statusService: StatusService,
    private psService: PrestationStatusService,
    private locService: LocalStorageService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.all();
    this.user = this.locService.get(GlobalName.userName);
    this.permissions = this.user.roles[0].permissions;
    this.buttonsPermission = { show: true, add: true, edit: true, delete: true };
    this.getEtapes();
    this.getPrestations();
    this.getStatuses();
  }

  getEtapes() {
    this.etapeService.getAll().subscribe((res: any) => {
      this.etapes = res.data;
    });
  }

  getPrestations() {
    this.prestationService.getAll().subscribe((res: any) => {
      this.prestations = res.data;
    });
  }

  getStatuses() {
    this.statusService.getAll().subscribe((res: any) => {
      this.statuses = res.data;
    });
  }

  onPrestationChange(prestationId: number) {
    this.filteredStatuses = [];
    if (!prestationId) return;
    this.psService.getByPrestation(prestationId).subscribe((res: any) => {
      this.filteredStatuses = res.data.map((ps: any) => ps.status);
    });
  }


 
  
    all() {
      this.loading2=true;
      this.wService.getAll().subscribe((res:any)=>{
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
  
    

add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    if (this.selected_data?.prestation_id) {
      this.onPrestationChange(this.selected_data.prestation_id);
    }
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

        this.wService.store(value).subscribe(
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


      this.wService.update(value,this.selected_data.id).subscribe(
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
    this.wService.delete(this.selected_data.id).subscribe(
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
        this.wService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.wService.search({search:this.search_text}).subscribe({
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
