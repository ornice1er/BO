import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { EtapeDocumentProduitService } from '../../../../core/services/etape-document-produit.service';
import { DocumentCircuitEtapeService } from '../../../../core/services/document-circuit-etape.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { TransitionCondition } from '../../../../core/Models/interface.model';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';

@Component({
    selector: 'app-workflow',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule,NgToggleModule, NgToggleComponent, HelpPanelComponent],
    templateUrl: './workflow.component.html',
    styleUrl: './workflow.component.css'
})
export class WorkflowComponent {
  isDtInitialized: boolean = false;
  add_data: any = {
    prestation_id: null, etape_from_id: null, etape_to_id: null,
    condition_type: null, status_result_id: null, order: null,
    'notify_requérant': false, notify_agent: false, is_active: true,
    can_act_pns: false, decision: '', observation: '',
  };

  selected_data: any;
  user: any;
  data: any[] = [];
  prestations: any[] = [];
  etapes: any[] = [];
  statuses: any[] = [];

  // ── Flux : circuit documentaire ──────────────────────────────────────────
  fluxTab: 'transitions' | 'circuit' = 'transitions';   // onglet actif (option B)
  showCircuit = false;                                   // inclure le circuit dans le flux (option A)
  docProduits: any[] = [];                               // documents produits de la prestation
  circuitSteps: any[] = [];                              // étapes de circuit de la prestation
  filteredStatuses: any[] = [];
  filteredEtapes: any[] = [];
  isCorrection = false;
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

  // ── Copie workflow ──────────────────────────────────────────────────────────
  copyFromPrestationId: number | null = null;
  copyToPrestationId:   number | null = null;
  loadingCopy = false;
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
    { value: 'correction',        label: 'Retour pour correction (métier)' },
    { value: 'retour_correction', label: 'Retour pour correction (requérant)' },
  ];

  constructor(
    private wService: WorkflowService,
    private etapeService: EtapeService,
    private prestationService: PrestationService,
    private statusService: StatusService,
    private psService: PrestationStatusService,
    private docProduitService: EtapeDocumentProduitService,
    private circuitService: DocumentCircuitEtapeService,
    private locService: LocalStorageService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
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
      const slug = this.route.snapshot.paramMap.get('slug');
      if (slug) {
        const prestation = this.prestations.find((p: any) => p.slug === slug);
        if (prestation) {
          this.filterPrestationId = prestation.id;
          this.onPrestationChange(prestation.id);
          this.applyPrestationFilter();
        }
      }
    });
  }

  getStatuses() {
    this.statusService.getAll().subscribe((res: any) => {
      this.statuses = res.data;
    });
  }

  onPrestationChange(prestationId: number) {
    this.filteredStatuses = [];
    this.filteredEtapes = [];
    if (!prestationId) return;
    this.psService.getByPrestation(prestationId).subscribe((res: any) => {
      this.filteredStatuses = res.data.map((ps: any) => ps.status);
    });
    this.filteredEtapes = [...this.etapes];
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
        const notifParts: string[] = [];
        if (t['notify_requérant']) notifParts.push('🔔req');
        if (t.notify_agent)        notifParts.push('📨agt');
        const label = [
          t.condition_type,
          t.can_act_pns ? `⚡PNS${t.decision ? ':' + t.decision : ''}` : '',
          ...notifParts,
        ].filter(Boolean).join(' ');

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

      // ── Option A : greffer le circuit documentaire (pointillés) ──────────────
      if (this.showCircuit) {
        const circStepIds: string[] = [];
        this.docProduits.forEach((dp: any) => {
          const steps = this.stepsOf(dp.id);
          if (!steps.length) return;
          const dpName = (dp.name ?? `Doc ${dp.id}`).replace(/"/g, "'");
          // lien étape d'édition -.-> document
          lines.push(`  E${dp.etape_edition_id} -.->|📄 génère| DOC${dp.id}{{"${dpName}"}}`);
          lines.push(`  subgraph CIRC${dp.id} ["🖋️ Circuit : ${dpName}"]`);
          lines.push('    direction LR');
          steps.forEach((s: any, i: number) => {
            const last = i === steps.length - 1;
            const label = `${s.order ?? i + 1}. ${s.role_name ?? '?'} · ${s.action_type ?? '?'}${last ? ' ✓' : ''}`
              .replace(/"/g, "'");
            lines.push(`    S${s.id}["${label}"]`);
            if (i > 0) lines.push(`    S${steps[i - 1].id} --> S${s.id}`);
            circStepIds.push(`S${s.id}`);
          });
          lines.push('  end');
          lines.push(`  DOC${dp.id} -.-> S${steps[0].id}`);
          circStepIds.push(`DOC${dp.id}`);

          // Couplage action_type = condition_type : chaque step déclenche la
          // transition de requête de même condition_type (hors subgraph).
          steps.forEach((s: any) => {
            const match = this.data.find((t: any) => t.condition_type === s.action_type);
            if (!match) return;
            const target = match.etape_to_id ? `E${match.etape_to_id}` : 'FIN';
            lines.push(`  S${s.id} -.->|⇄ ${s.action_type}| ${target}`);
          });
        });
        if (circStepIds.length) {
          lines.push('  classDef circ fill:#fff3e0,stroke:#e67e22,color:#7a3e00;');
          lines.push(`  class ${circStepIds.join(',')} circ;`);
        }
      }

      return lines.join('\n');
    }

    zoomIn()    { this.zoomLevel = Math.min(3.0, +(this.zoomLevel + 0.1).toFixed(1)); }
    zoomOut()   { this.zoomLevel = Math.max(0.3, +(this.zoomLevel - 0.1).toFixed(1)); }
    resetZoom() { this.zoomLevel = 1; }

    // ── Export du flux en image (SVG / PNG) ──────────────────────────────────
    private getFluxSvg(): SVGSVGElement | null {
      const container = document.getElementById('mermaid-flux-container');
      return container?.querySelector('svg') ?? null;
    }

    private fluxFilename(ext: string): string {
      const presta = (this.fluxPrestationName || 'flux').replace(/[^\w\-]+/g, '_');
      const onglet = this.fluxTab === 'circuit' ? 'circuit' : 'transitions';
      return `flux_${presta}_${onglet}.${ext}`;
    }

    private telecharger(url: string, filename: string): void {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    exporterSvg(): void {
      const svg = this.getFluxSvg();
      if (!svg) { this.toastrService.warning('Aucun diagramme à exporter'); return; }
      const source = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      this.telecharger(URL.createObjectURL(blob), this.fluxFilename('svg'));
    }

    exporterPng(): void {
      const svg = this.getFluxSvg();
      if (!svg) { this.toastrService.warning('Aucun diagramme à exporter'); return; }
      const source = new XMLSerializer().serializeToString(svg);
      const vb = (svg as any).viewBox?.baseVal;
      const width  = (vb && vb.width)  ? vb.width  : ((svg as any).clientWidth  || 1200);
      const height = (vb && vb.height) ? vb.height : ((svg as any).clientHeight || 800);
      const scale = 2; // qualité ×2
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width  = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) { this.toastrService.error('Conversion PNG impossible'); return; }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) this.telecharger(URL.createObjectURL(blob), this.fluxFilename('png'));
          else this.toastrService.error('Échec de la génération PNG');
        }, 'image/png');
      };
      img.onerror = () => this.toastrService.error('Échec de la conversion en PNG');
      // base64 en gérant l'UTF-8 (accents) du SVG
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(source)));
    }

    async openFluxModal(content: any) {
      this.zoomLevel = 1;
      this.fluxTab = 'transitions';
      const prestation = this.prestations.find((p: any) => p.id === this.filterPrestationId);
      this.fluxPrestationName = prestation?.name ?? '';
      (document.activeElement as HTMLElement)?.blur();
      this.modalService.open(content, { size: 'xl', scrollable: true, windowClass: 'flux-modal-xxl' });
      if (!this.filterPrestationId) return;

      await this.loadCircuitData();
      this.renderDiagram();
    }

    /** Charge les documents produits et leurs étapes de circuit pour la prestation filtrée */
    private loadCircuitData(): Promise<void> {
      return new Promise((resolve) => {
        let pending = 2;
        const done = () => { if (--pending === 0) resolve(); };
        this.docProduitService.getAll().subscribe({
          next: (res: any) => {
            this.docProduits = (res.data ?? res ?? [])
              .filter((dp: any) => dp.prestation_id === this.filterPrestationId);
            done();
          },
          error: () => { this.docProduits = []; done(); }
        });
        this.circuitService.getAll().subscribe({
          next: (res: any) => {
            this.circuitSteps = (res.data ?? res ?? [])
              .filter((c: any) => c?.doc_produit?.prestation_id === this.filterPrestationId)
              .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
            done();
          },
          error: () => { this.circuitSteps = []; done(); }
        });
      });
    }

    /** Bascule d'onglet (transitions ⇄ circuit documentaire) */
    setFluxTab(tab: 'transitions' | 'circuit') {
      this.fluxTab = tab;
      this.renderDiagram();
    }

    /** Toggle « inclure le circuit dans le flux » (onglet transitions) */
    onToggleCircuit() {
      this.renderDiagram();
    }

    /** Rend le diagramme mermaid courant dans le conteneur, selon l'onglet actif */
    private renderDiagram() {
      setTimeout(async () => {
        const container = document.getElementById('mermaid-flux-container');
        if (!container) return;
        container.innerHTML = '<p class="text-muted text-center">Génération du diagramme…</p>';
        try {
          const { default: mermaid } = await import('mermaid');
          mermaid.initialize({ startOnLoad: false, theme: 'default', flowchart: { padding: 24, nodeSpacing: 50, rankSpacing: 80 } });
          const code = this.fluxTab === 'circuit'
            ? this.buildCircuitMermaidCode()
            : this.buildMermaidCode();
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
      }, 150);
    }

    /** Nom d'une étape à partir de son id (via la liste etapes chargée) */
    private etapeName(id: any): string {
      const e = this.etapes.find((x: any) => x.id === id);
      return (e?.name ?? `Étape ${id}`).replace(/"/g, "'");
    }

    /** Étapes de circuit d'un document produit, ordonnées */
    private stepsOf(docProduitId: any): any[] {
      return this.circuitSteps
        .filter((c: any) => c.doc_produit_id === docProduitId)
        .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
    }

    /** Option B — Diagramme dédié au circuit documentaire */
    buildCircuitMermaidCode(): string {
      const docs = this.docProduits;
      if (!docs.length) return 'flowchart LR\n  MSG["Aucun document produit pour cette prestation"]';

      const lines: string[] = ['flowchart LR'];
      let any = false;

      docs.forEach((dp: any) => {
        const steps = this.stepsOf(dp.id);
        const dpName = (dp.name ?? `Doc ${dp.id}`).replace(/"/g, "'");
        const edName = this.etapeName(dp.etape_edition_id);
        lines.push(`  subgraph DP${dp.id} ["📄 ${dpName} — édition: ${edName}"]`);
        lines.push('    direction LR');
        if (!steps.length) {
          lines.push(`    DPN${dp.id}["(aucune étape de circuit)"]`);
        } else {
          steps.forEach((s: any, i: number) => {
            const last = i === steps.length - 1;
            const label = `${s.order ?? i + 1}. ${s.role_name ?? '?'} · ${s.action_type ?? '?'}${last ? ' ✓' : ''}`
              .replace(/"/g, "'");
            lines.push(`    S${s.id}["${label}"]`);
            if (i > 0) lines.push(`    S${steps[i - 1].id} --> S${s.id}`);
          });
        }
        lines.push('  end');
        any = any || steps.length > 0;
      });

      if (!any) lines.push('  NOTE["Aucune étape de circuit configurée"]');
      lines.push('  classDef circ fill:#fff3e0,stroke:#e67e22,color:#7a3e00;');
      // appliquer la classe à tous les noeuds de circuit
      this.circuitSteps.forEach((s: any) => lines.push(`  class S${s.id} circ;`));
      return lines.join('\n');
    }

 
  
    checked(el:any){
      this.selected_data=el

    }
  
    

add(content: any) {
    this.isCorrection = false;
    this.add_data = {
      prestation_id: this.filterPrestationId ?? null, etape_from_id: null, etape_to_id: null,
      condition_type: null, status_result_id: null, order: null,
      'notify_requérant': false, notify_agent: false, is_active: true,
      can_act_pns: false, decision: '', observation: '',
    };
    if (this.filterPrestationId) this.onPrestationChange(this.filterPrestationId);
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  addCorrection(content: any) {
    if (!this.selected_data) {
      this.toastrService.warning('Sélectionnez une transition à inverser pour créer un retour correction');
      return;
    }
    const pd = this.selected_data.prestation_id;
    this.add_data = {
      prestation_id:    pd,
      etape_from_id:    this.selected_data.etape_to_id   ?? null,
      etape_to_id:      this.selected_data.etape_from_id ?? null,
      condition_type:   'correction',
      status_result_id: null,
      order:            null,
      'notify_requérant': false,
      notify_agent:     false,
      is_active:        true,
      can_act_pns:      false,
      decision:         '',
      observation:      '',
    };
    this.isCorrection = true;
    if (pd) this.onPrestationChange(pd);
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
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
            this.modalService.dismissAll();
            this.toastrService.success('Transition enregistrée avec succès');
            this.all();
        },
        (err:any)=>{
            this.loading=false;
            this.toastrService.error(err?.error?.message ?? 'Enregistrement échoué');
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

  openCopyModal(modal: any): void {
    this.copyFromPrestationId = null;
    this.copyToPrestationId   = this.filterPrestationId;
    this.modalService.open(modal, { size: 'md' });
  }

  copyWorkflow(): void {
    if (!this.copyFromPrestationId || !this.copyToPrestationId) {
      this.toastrService.warning('Sélectionnez les deux prestations');
      return;
    }
    if (this.copyFromPrestationId === this.copyToPrestationId) {
      this.toastrService.warning('Source et destination doivent être différentes');
      return;
    }
    this.loadingCopy = true;
    this.wService.copyFromPrestation(this.copyFromPrestationId, this.copyToPrestationId).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message ?? 'Workflow copié avec succès');
        this.loadingCopy = false;
        this.modalService.dismissAll();
        this.all();
      },
      error: (err: any) => {
        this.loadingCopy = false;
        AppErrorShow.showError('Copie échouée', err);
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
