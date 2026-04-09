// ─── document-editor.component.ts ───────────────────────────────────────────
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfigService } from '../../../core/utils/config-service';
import { LoadingComponent } from '../loading/loading.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, QuillModule, LoadingComponent,NgxExtendedPdfViewerModule],
  template: `
<div class="card" *ngIf="acte">

  <!-- En-tête -->
  <div class="card-header d-flex justify-content-between align-items-center">
    <div>
      <strong>{{ acte?.doc_produit?.name }}</strong>
      <span class="badge bg-secondary ms-2">N° {{ acte?.numero_identification }}</span>
      <span class="badge ms-2"
        [ngClass]="{
          'bg-warning text-dark': acte?.status === 'en_edition',
          'bg-primary':           acte?.status === 'en_circuit',
          'bg-success':           acte?.status === 'complet'
        }">
        {{ acte?.status }}
      </span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" (click)="previsualiser()" *ngIf="acte?.file_url">
      <i class="bi bi-eye me-1"></i>Prévisualiser
    </button>
  </div>

  <!-- Onglets -->
  <div class="card-body">
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab === 'generer'"
           (click)="activeTab = 'generer'" href="javascript:void(0)">
          <i class="bi bi-magic me-1"></i>Générer
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab === 'wysiwyg'"
           (click)="activeTab = 'wysiwyg'" href="javascript:void(0)">
          <i class="bi bi-pencil-square me-1"></i>Éditeur
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" [class.active]="activeTab === 'upload'"
           (click)="activeTab = 'upload'" href="javascript:void(0)">
          <i class="bi bi-upload me-1"></i>Upload PDF
        </a>
      </li>
    </ul>

    <!-- ── ONGLET 1 : GÉNÉRER ─────────────────────────────────────────────── -->
    <div *ngIf="activeTab === 'generer'">
      <p class="text-muted small mb-3">
        Le document sera généré automatiquement à partir des données de la demande
        et du template configuré.
      </p>

      <div class="form-group mb-3">
        <label class="fw-semibold">Titre du document</label>
        <input type="text" class="form-control mt-1"
               [(ngModel)]="formData.title"
               placeholder="Ex: Projet de lettre d'agrément N° ...">
      </div>

      <div class="form-group mb-3">
        <label class="fw-semibold">Corps du document</label>
        <div class="border rounded p-2 bg-light small mt-1">
          <p class="mb-1 text-muted">Variables disponibles :</p>
          <span *ngFor="let v of variableKeys"
                class="badge bg-secondary me-1 mb-1 cursor-pointer"
                (click)="insererVariable(v)"
                style="cursor:pointer">
            {{ '{' }}{{ '{' }}{{ v }}{{ '}' }}{{ '}' }}
          </span>
        </div>
        <textarea class="form-control mt-2" rows="8"
                  [(ngModel)]="formData.content"
                  placeholder="Saisissez le corps du document...">
        </textarea>
      </div>

      <div class="form-group mb-3">
        <label class="fw-semibold">Conclusion</label>
        <textarea class="form-control mt-1" rows="3"
                  [(ngModel)]="formData.conclusion"
                  placeholder="Formule de politesse...">
        </textarea>
      </div>

      <button class="btn btn-primary" (click)="generer()" [disabled]="loading">
        <i class="bi bi-file-pdf me-1"></i>
        Générer le PDF
        <app-loading [isVisible]="loading"></app-loading>
      </button>
    </div>

    <!-- ── ONGLET 2 : WYSIWYG ─────────────────────────────────────────────── -->
    <div *ngIf="activeTab === 'wysiwyg'">
      <p class="text-muted small mb-3">
        Éditez le document librement. Les variables entre
        <code>{{ '{' }}{{ '{' }}variable{{ '}' }}{{ '}' }}</code>
        seront remplacées automatiquement lors de la génération PDF.
      </p>

      <div class="form-group mb-3">
        <label class="fw-semibold">Titre</label>
        <input type="text" class="form-control mt-1"
               [(ngModel)]="formData.title">
      </div>

      <div class="form-group mb-3">
        <label class="fw-semibold">Corps du document</label>
        <quill-editor
          [(ngModel)]="formData.htmlContent"
          [modules]="quillModules"
          placeholder="Rédigez le contenu..."
          style="min-height: 300px; display:block; margin-top:8px;">
        </quill-editor>
      </div>

      <div class="form-group mb-3">
        <label class="fw-semibold">Conclusion</label>
        <textarea class="form-control mt-1" rows="2"
                  [(ngModel)]="formData.conclusion">
        </textarea>
      </div>

      <button class="btn btn-primary" (click)="sauvegarderWysiwyg()" [disabled]="loading">
        <i class="bi bi-save me-1"></i>
        Sauvegarder et générer PDF
        <app-loading [isVisible]="loading"></app-loading>
      </button>
    </div>

    <!-- ── ONGLET 3 : UPLOAD ──────────────────────────────────────────────── -->
    <div *ngIf="activeTab === 'upload'">
      <p class="text-muted small mb-3">
        Uploadez un PDF préparé en dehors du système
        (Word exporté en PDF, document scanné signé...).
      </p>

      <div class="form-group mb-3">
        <label class="fw-semibold">Fichier PDF</label>
        <input type="file" class="form-control mt-1"
               accept="application/pdf"
               (change)="onFileSelected($event)">
        <small class="text-muted">Format PDF uniquement — max 10 Mo</small>
      </div>

      <div *ngIf="selectedFile" class="alert alert-info mt-2">
        <i class="bi bi-file-earmark-pdf me-1"></i>
        {{ selectedFile.name }} ({{ (selectedFile.size / 1024 / 1024).toFixed(2) }} Mo)
      </div>

      <button class="btn btn-primary" (click)="uploadPdf()"
              [disabled]="!selectedFile || loading">
        <i class="bi bi-upload me-1"></i>
        Uploader
        <app-loading [isVisible]="loading"></app-loading>
      </button>
    </div>

  </div>

  <!-- Footer — Soumettre au circuit -->
  <div class="card-footer d-flex justify-content-between align-items-center"
       *ngIf="acte?.file_url">
    <span class="text-success small">
      <i class="bi bi-check-circle me-1"></i>
      Document généré — prêt à soumettre au circuit de signature
    </span>
    <button class="btn btn-success" (click)="soumettre()" [disabled]="loading">
      <i class="bi bi-send me-1"></i>
      Soumettre au DGT pour paraphe
      <app-loading [isVisible]="loading"></app-loading>
    </button>
  </div>

</div>

<!-- Chargement initial -->
<div class="text-center py-5" *ngIf="!acte && loading">
  <div class="spinner-border text-primary"></div>
  <p class="mt-2 text-muted">Initialisation du document...</p>
</div>

<!-- Ajouter ce template offcanvas -->
<ng-template #pdfOffcanvas let-offcanvas>
  <div class="offcanvas-header">
    <h4 class="offcanvas-title">
      <i class="bi bi-file-earmark-pdf text-danger me-2"></i>
      {{ acte?.doc_produit?.name }} — {{ acte?.numero_identification }}
    </h4>
    <button type="button" class="btn-close" (click)="offcanvas.dismiss()"></button>
  </div>
  <div class="offcanvas-body p-0">
  <ngx-extended-pdf-viewer [src]="pdfSrc" height="80vh" useBrowserLocale="true">
    </ngx-extended-pdf-viewer>
  </div>
</ng-template>
  `,
  encapsulation:ViewEncapsulation.None,
})
export class DocumentEditorComponent implements OnInit {

  @Input() requeteId!: number;
  @Input() docProduitId!: number;
  @Output() submitted = new EventEmitter<any>();

  // ── État ──────────────────────────────────────────────────────────────────
  acte: any      = null;
  variables: any = {};
  variableKeys: string[] = [];
  activeTab      = 'generer';
  loading        = false;
  showPreview    = false;
  pdfSrc: any = null;
  selectedFile: File | null = null;

  formData = {
    title:       '',
    content:     '',
    conclusion:  '',
    htmlContent: '',
  };

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean'],
    ]
  };

  private baseUrl = ConfigService.toApiUrl('document-actes');
@ViewChild('pdfOffcanvas') pdfOffcanvasRef!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private offcanvasService: NgbOffcanvas, 
  ) {}

  ngOnInit(): void {
    this.initialiser();
  }

  // ── Initialisation ────────────────────────────────────────────────────────
  initialiser(): void {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/init/${this.requeteId}/${this.docProduitId}`)
      .subscribe({
        next: (res) => {
          this.loading      = false;
          this.acte         = res.data.acte;
          this.variables    = res.data.variables;
          this.variableKeys = Object.keys(this.variables);

          // Préremplir le formulaire avec les variables
          this.formData.title = res.data.acte?.doc_produit?.name ?? '';

          // Si contenu déjà sauvegardé, le recharger
          if (this.acte?.content_data) {
            const saved = JSON.parse(this.acte.content_data);
            this.formData.content     = saved.content     ?? '';
            this.formData.conclusion  = saved.conclusion  ?? '';
            this.formData.htmlContent = saved.content     ?? '';
          }
        },
        error: () => {
          this.loading = false;
          this.toastr.error('Impossible d\'initialiser le document');
        }
      });
  }

  // ── Insérer variable dans le textarea ────────────────────────────────────
  insererVariable(key: string): void {
    this.formData.content += ` {{${key}}} `;
  }

  // ── Générer via template ──────────────────────────────────────────────────
  generer(): void {
    this.loading = true;
    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/generer`, {
      title:      this.formData.title,
      content:    this.formData.content,
      conclusion: this.formData.conclusion,
      variables:  this.variables,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.acte    = res.data.acte;
        this.toastr.success('Document généré avec succès');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Génération échouée');
      }
    });
  }

  // ── Sauvegarder WYSIWYG ───────────────────────────────────────────────────
  sauvegarderWysiwyg(): void {
    this.loading = true;
    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/sauvegarder`, {
      title:        this.formData.title,
      html_content: this.formData.htmlContent,
      conclusion:   this.formData.conclusion,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.acte    = res.data.acte;
        this.toastr.success('Document sauvegardé');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Sauvegarde échouée');
      }
    });
  }

  // ── Upload PDF externe ────────────────────────────────────────────────────
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      this.toastr.warning('Seuls les fichiers PDF sont acceptés');
    }
  }

  uploadPdf(): void {
    if (!this.selectedFile) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/upload`, formData)
      .subscribe({
        next: (res) => {
          this.loading      = false;
          this.acte         = res.data.acte;
          this.selectedFile = null;
          this.toastr.success('PDF uploadé avec succès');
        },
        error: (err) => {
          this.loading = false;
          this.toastr.error(err?.error?.message ?? 'Upload échoué');
        }
      });
  }

  // ── Prévisualiser ─────────────────────────────────────────────────────────
previsualiser(): void {
  if (!this.acte?.file_url) {
    this.toastr.warning('Aucun document généré');
    return;
  }
  this.pdfSrc = this.acte.file_url;
  //this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.acte.file_url);
  this.offcanvasService.open(this.pdfOffcanvasRef, {
    position: 'end',
    panelClass: 'offcanvas-wide',  // classe CSS pour la largeur
  });
}

  // ── Soumettre au circuit ──────────────────────────────────────────────────
  soumettre(): void {
    this.loading = true;
    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/soumettre`, {
      comment: 'Document soumis au circuit de signature',
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.toastr.success('Document soumis au circuit — DGT notifié');
        this.submitted.emit(res.data);
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Soumission échouée');
      }
    });
  }
}