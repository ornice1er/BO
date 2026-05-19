import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../../core/services/project.service';
import { ProjectDocumentService } from '../../../../../core/services/project-document.service';
import { LocalStorageService } from '../../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { QuillModule } from 'ngx-quill';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ConfigService } from '../../../../../core/utils/config-service';

@Component({
    selector: 'app-project-detail',
    imports: [
      CommonModule, FormsModule, NgbModule, LoadingComponent,
      SampleSearchPipe, NgSelectModule, NgxPaginationModule,
      MatTooltipModule, QuillModule, NgxExtendedPdfViewerModule,
    ],
    templateUrl: './project-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {

  @ViewChild('agrementOffcanvas') agrementOffcanvasRef!: TemplateRef<any>;

  search_text: any = '';
  loading2 = false;
  id: any;
  data: any;
  requetes: any[] = [];
  statuses: any[] = [];
  selectedStatus: string = '';

  pg = { pageSize: 10, p: 1, total: 0 };

  // ── Agrément ────────────────────────────────────────────────────────────────
  templates: any[] = [];
  selectedTemplateId: any = null;
  agrementDoc: any = null;           // ProjectDocument courant
  agrementContent = '';              // contenu dans l'éditeur Quill
  agrementTitle   = '';
  loadingAgrement = false;
  pdfSrc: string | null = null;

  quillModules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link'],
      ['clean'],
    ],
  };

  constructor(
    private projectService: ProjectService,
    private projectDocService: ProjectDocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private locService: LocalStorageService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.get();
    this.loadTemplates();
  }

  get filteredRequetes(): any[] {
    if (!this.selectedStatus) return this.requetes;
    return this.requetes.filter(r => r?.current_status?.short_name === this.selectedStatus);
  }

  get() {
    this.loading2 = true;
    this.projectService.show(this.id).subscribe(
      (res: any) => {
        this.data = res.data;
        this.requetes = this.data?.requetes ?? [];
        this.statuses = [...new Map(
          this.requetes
            .filter(r => r?.current_status)
            .map(r => [r.current_status.short_name, r.current_status])
        ).values()];
        this.loading2 = false;
      },
      () => { this.loading2 = false; }
    );
  }

  // ── Templates disponibles ──────────────────────────────────────────────────
  loadTemplates(): void {
    this.projectDocService.getTemplates().subscribe({
      next: (res: any) => { this.templates = res.data ?? []; },
      error: () => {}
    });
  }

  // ── Ouvrir le panneau agrément ────────────────────────────────────────────
  ouvrirAgrement(): void {
    this.offcanvasService.open(this.agrementOffcanvasRef, {
      position: 'end',
      panelClass: 'offcanvas-agrement',
    });

    // Recharger la liste des documents déjà produits pour ce projet
    this.projectDocService.getDocuments(this.id).subscribe({
      next: (res: any) => {
        const docs: any[] = res.data ?? [];
        if (docs.length > 0) {
          this.agrementDoc = docs[0];
          this.selectedTemplateId  = this.agrementDoc.template_id;
          this.agrementTitle   = this.agrementDoc.title ?? '';
          this.agrementContent = this.agrementDoc.content ?? '';
        }
      },
      error: () => {}
    });
  }

  // ── Chargement du template choisi ─────────────────────────────────────────
  onTemplateChange(templateId: any): void {
    if (!templateId) return;
    this.loadingAgrement = true;

    this.projectDocService.init(this.id, templateId).subscribe({
      next: (res: any) => {
        this.loadingAgrement = false;
        this.agrementDoc = res.data?.document;
        const template   = res.data?.template;

        this.agrementTitle = this.agrementDoc?.title ?? template?.name ?? '';

        // Si déjà un contenu sauvegardé, le recharger ; sinon charger le template
        this.agrementContent = this.agrementDoc?.content || template?.content || '';
      },
      error: () => { this.loadingAgrement = false; }
    });
  }

  // ── Sauvegarder le contenu ─────────────────────────────────────────────────
  sauvegarder(): void {
    if (!this.agrementDoc?.id) {
      this.toastrService.warning('Sélectionnez d\'abord un modèle');
      return;
    }
    this.loadingAgrement = true;

    this.projectDocService.save(this.agrementDoc.id, {
      title:        this.agrementTitle,
      html_content: this.agrementContent,
    }).subscribe({
      next: (res: any) => {
        this.loadingAgrement = false;
        this.agrementDoc = res.data;
        this.toastrService.success('Document sauvegardé');
      },
      error: (err: any) => {
        this.loadingAgrement = false;
        this.toastrService.error(err?.error?.message ?? 'Sauvegarde échouée');
      }
    });
  }

  // ── Générer le PDF ────────────────────────────────────────────────────────
  genererPdf(): void {
    if (!this.agrementDoc?.id) {
      this.toastrService.warning('Sélectionnez d\'abord un modèle');
      return;
    }
    this.loadingAgrement = true;

    // Sauvegarder d'abord le contenu courant, puis générer
    this.projectDocService.save(this.agrementDoc.id, {
      title:        this.agrementTitle,
      html_content: this.agrementContent,
    }).subscribe({
      next: () => {
        this.projectDocService.generate(this.agrementDoc.id).subscribe({
          next: (res: any) => {
            this.loadingAgrement = false;
            this.agrementDoc = res.data;
            this.toastrService.success('PDF généré avec succès');
          },
          error: (err: any) => {
            this.loadingAgrement = false;
            this.toastrService.error(err?.error?.message ?? 'Génération échouée');
          }
        });
      },
      error: (err: any) => {
        this.loadingAgrement = false;
        this.toastrService.error(err?.error?.message ?? 'Sauvegarde échouée');
      }
    });
  }

  // ── Prévisualiser le PDF ──────────────────────────────────────────────────
  previsualiserPdf(): void {
    if (!this.agrementDoc?.file_url) return;
    this.pdfSrc = ConfigService.toFile(this.agrementDoc.file_url);
  }

  // ────────────────────────────────────────────────────────────────────────────

  expandedIds = new Set<number>();

  toggleExpand(id: number): void {
    this.expandedIds.has(id) ? this.expandedIds.delete(id) : this.expandedIds.add(id);
  }

  stepFields(d: any): { label: string; value: any }[] {
    const steps: any[] = d?.step_contents ?? [];
    const fields: { label: string; value: any }[] = [];
    for (const step of steps) {
      const content = step?.content ?? {};
      for (const [key, val] of Object.entries(content)) {
        if (val !== null && val !== '' && val !== undefined) {
          fields.push({ label: key, value: val });
        }
      }
    }
    return fields;
  }

  voirRequete(d: any): void {
    const code = d?.code;
    const prestationCode = d?.prestation?.code;
    if (code && prestationCode) {
      this.router.navigate(['/admin/eservice/espace-traitement-show', code, prestationCode]);
    }
  }

  onStatusChange(): void {
    this.pg.p = 1;
  }

  getPage(event: any): void {
    this.pg.p = event;
  }

  exportList(): void {
    this.loading2 = true;
    const ids = this.filteredRequetes.map((req: any) => req.id);
    this.projectService.exportList(this.id, { ids }).subscribe(
      (res: any) => {
        window.open(res.data, '_blank');
        this.loading2 = false;
      },
      () => { this.loading2 = false; }
    );
  }
}
