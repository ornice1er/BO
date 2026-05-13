import { Component } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EtapeService } from '../../../../core/services/etape.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { StatusService } from '../../../../core/services/status.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
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
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

@Component({
    selector: 'app-workflow',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule,NgToggleModule, NgToggleComponent],
    templateUrl: './workflow.component.html',
    styleUrl: './workflow.component.css'
})
export class WorkflowComponent {
  isDtInitialized: boolean = false;
  add_data: any = { can_act_pns: false, decision: ''};

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
  filterPrestationId: number | null = null;
  allData: any[] = [];
  fluxPrestationName = '';
  zoomLevel = 1;

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
        this.allData=res.data;
        this.applyPrestationFilter();
        this.loading2=false;
        this.selectedId=null;
      },
      (error:any)=>{
        this.loading2=false;
      })
    }

    applyPrestationFilter() {
      this.data = this.filterPrestationId
        ? this.allData.filter((d: any) => d.prestation_id === this.filterPrestationId)
        : [...this.allData];
      this.pg.total = this.data.length;
    }

    onFilterPrestationChange() {
      this.search_text = '';
      this.pg.p = 1;
      this.applyPrestationFilter();
    }

    buildMermaidCode(): string {
      if (!this.data.length) return 'flowchart LR\n  MSG["Aucune transition disponible"]';

      const lines: string[] = ['flowchart LR'];
      const pnsIndices: number[] = [];
      let linkIdx = 0;

      this.data.forEach((t: any) => {
        const fromId = `E${t.etape_from_id}`;
        const fromLabel = (t.etape_from?.name ?? `Étape ${t.etape_from_id}`).replace(/"/g, "'");
        const label = t.condition_type + (t.can_act_pns ? ' ⚡PNS' : '');

        if (t.can_act_pns) pnsIndices.push(linkIdx);
        linkIdx++;

        if (t.etape_to_id) {
          const toId = `E${t.etape_to_id}`;
          const toLabel = (t.etape_to?.name ?? `Étape ${t.etape_to_id}`).replace(/"/g, "'");
          lines.push(`  ${fromId}["${fromLabel}"] -->|${label}| ${toId}["${toLabel}"]`);
        } else {
          lines.push(`  ${fromId}["${fromLabel}"] -->|${label}| FIN(("FIN"))`);
        }
      });

      pnsIndices.forEach(i => {
        lines.push(`  linkStyle ${i} stroke:#e67e22,stroke-width:2.5px,color:#e67e22`);
      });

      return lines.join('\n');
    }

    zoomIn()    { this.zoomLevel = Math.min(3.0, +(this.zoomLevel + 0.1).toFixed(1)); }
    zoomOut()   { this.zoomLevel = Math.max(0.3, +(this.zoomLevel - 0.1).toFixed(1)); }
    resetZoom() { this.zoomLevel = 1; }

    async openFluxModal(content: any) {
      this.zoomLevel = 1;
      const prestation = this.prestations.find((p: any) => p.id === this.filterPrestationId);
      this.fluxPrestationName = prestation?.name ?? '';
      (document.activeElement as HTMLElement)?.blur();
      this.modalService.open(content, { size: 'xl', scrollable: true });
      if (!this.filterPrestationId) return;

      setTimeout(async () => {
        const container = document.getElementById('mermaid-flux-container');
        if (!container) return;
        container.innerHTML = '<p class="text-muted text-center">Génération du diagramme…</p>';
        try {
          const { default: mermaid } = await import('mermaid');
          mermaid.initialize({ startOnLoad: false, theme: 'default', flowchart: { padding: 24, nodeSpacing: 50, rankSpacing: 80 } });
          const code = this.buildMermaidCode();
          const id = 'mermaid-svg-' + Date.now();
          const { svg } = await mermaid.render(id, code);
          container.innerHTML = svg;
          const svgEl = container.querySelector('svg');
          if (svgEl) {
            // Expand viewBox by 20px on each side to avoid clipping at edges
            const vb = svgEl.getAttribute('viewBox');
            if (vb) {
              const [x, y, w, h] = vb.split(' ').map(Number);
              const pad = 40;
              svgEl.setAttribute('viewBox', `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`);
            }
            const naturalWidth = svgEl.style.maxWidth;
            svgEl.style.maxWidth = 'none';
            svgEl.style.width  = (naturalWidth && naturalWidth !== 'none') ? naturalWidth : '';
            svgEl.style.height = 'auto';
            svgEl.removeAttribute('width');
            svgEl.removeAttribute('height');
          }
        } catch {
          container.innerHTML = '<p class="text-danger text-center">Erreur lors du rendu du diagramme.</p>';
        }
      }, 200);
    }

 
  
    checked(el:any){
      this.selected_data=el

    }
  
    

add(content:any){
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content,{size:'lg'});
  }

  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    if (this.selected_data?.prestation_id) {
      this.onPrestationChange(this.selected_data.prestation_id);
    }
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

async deleteAllForPrestation() {
  if (!this.filterPrestationId) return;
  const prestation = this.prestations.find((p: any) => p.id === this.filterPrestationId);
  const name = prestation?.name ?? `ID ${this.filterPrestationId}`;
  const count = this.data.length;
  const msg = `Supprimer les ${count} transition(s) de « ${name} » ?\n\nCette action est irréversible.`;
  const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', msg);
  if (!result.isConfirmed) return;

  this.loading = true;
  this.wService.deleteByPrestation(this.filterPrestationId).subscribe({
    next: (res: any) => {
      this.toastrService.success(res.message ?? 'Transitions supprimées');
      this.filterPrestationId = null;
      this.loading = false;
      this.all();
    },
    error: (err: any) => {
      this.loading = false;
      AppErrorShow.showError('Suppression échouée', err);
    }
  });
}

async delete() {
  this.loading=true;
  const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Voulez vous supprimer cet élément');
  if (result.isConfirmed) {
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
          AppErrorShow.showError("Opération échouée", err)
      })
  }


 onSearchChange() {
  const localResults = this.data.filter((d:any) => d.prestation?.name?.includes(this.search_text));
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
  this.filterPrestationId = null;
  this.isPaginate = true;
  this.pg.p = 1;
  this.data = [...this.allData];
  this.pg.total = this.data.length;
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
