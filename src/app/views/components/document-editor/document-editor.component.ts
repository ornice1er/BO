// ─── document-editor.component.ts ───────────────────────────────────────────
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
  imports: [CommonModule, FormsModule, NgbModule, QuillModule, NgxExtendedPdfViewerModule, LoadingComponent],
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
          'bg-info text-dark':    acte?.status === 'en_attente_pns',
          'bg-primary':           acte?.status === 'en_circuit',
          'bg-success':           acte?.status === 'complet'
        }">
        {{ acte?.status === 'en_attente_pns' ? 'En attente PNS' : acte?.status }}
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
        <a class="nav-link text-dark" [class.active]="activeTab === 'generer'"
           (click)="activeTab = 'generer'" href="javascript:void(0)">
          <i class="bi bi-magic me-1"></i>Générer
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" [class.active]="activeTab === 'wysiwyg'"
           (click)="activeTab = 'wysiwyg'" href="javascript:void(0)">
          <i class="bi bi-pencil-square me-1"></i>Éditeur
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" [class.active]="activeTab === 'upload'"
           (click)="activeTab = 'upload'" href="javascript:void(0)">
          <i class="bi bi-upload me-1"></i>Upload PDF
        </a>
      </li>
    </ul>

    <!-- ── ONGLET 1 : GÉNÉRER ─────────────────────────────────────────────── -->
    <div *ngIf="activeTab === 'generer' && (contentType==1 || contentType==0)">
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
          <p class="mb-1 text-muted fw-semibold">Variables disponibles — cliquer pour insérer au curseur :</p>
          <span *ngFor="let v of variableKeys"
                class="badge bg-secondary me-1 mb-1"
                (click)="insererVariable(v)"
                style="cursor:pointer; user-select:none">
            {{ '{' }}{{ '{' }}{{ v }}{{ '}' }}{{ '}' }}
          </span>
        </div>
        <quill-editor
          [(ngModel)]="formData.content"
          [modules]="quillModules"
          (onEditorCreated)="onGenererEditorCreated($event)"
          placeholder="Saisissez le corps du document...">
        </quill-editor>
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
    <div *ngIf="activeTab === 'wysiwyg' && (contentType==1 || contentType==0)" >

      <!-- Bandeau d'attente PNS -->
      <div *ngIf="isPending" class="alert alert-info mb-3">
        <div *ngIf="countdown !== null" class="d-flex align-items-center gap-2">
          <div class="spinner-border spinner-border-sm text-info flex-shrink-0"></div>
          <span>
            Contenu envoyé au PNS — vérification du retour dans
            <strong>{{ countdown }}s</strong>…
          </span>
        </div>
        <div *ngIf="countdown === null" class="d-flex align-items-center justify-content-between">
          <span>
            <i class="bi bi-hourglass-split me-2"></i>
            En attente du retour PNS. Si le document n'est pas encore disponible,
            vous pouvez vérifier le statut ou renvoyer le contenu.
          </span>
          <button class="btn btn-sm btn-outline-info ms-3" (click)="verifierStatutPns()" [disabled]="loading">
            <i class="bi bi-arrow-clockwise me-1"></i>Vérifier le statut
          </button>
        </div>
      </div>

      <p class="text-muted small mb-3" *ngIf="!isPns">
        Éditez le document librement. Les variables entre
        <code>{{ '{' }}{{ '{' }}variable{{ '}' }}{{ '}' }}</code>
        seront remplacées automatiquement <strong>uniquement lorsque le document est généré par le système</strong>
        (onglet <em>Générer</em>). Un document uploadé manuellement ne bénéficie pas de ce remplacement.
      </p>

      <div class="form-group mb-3">
        <label class="fw-semibold">Corps du document</label>
        <quill-editor
          [(ngModel)]="formData.htmlContent"
          [modules]="quillModules"
          placeholder="Rédigez le contenu...">
        </quill-editor>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-primary" (click)="sauvegarderWysiwyg()"
                [disabled]="loading || countdown !== null || (isPns && !!acte?.file_url)">
          <i class="bi me-1" [ngClass]="isPns ? 'bi-send' : 'bi-save'"></i>
          {{ isPns ? (isPending ? 'Renvoyer au PNS' : 'Envoyer au PNS pour génération') : 'Sauvegarder et générer PDF' }}
          <app-loading [isVisible]="loading"></app-loading>
        </button>
        <span *ngIf="countdown !== null" class="text-muted small">
          <span class="spinner-border spinner-border-sm me-1"></span>
          Vérification dans <strong>{{ countdown }}s</strong>…
        </span>
      </div>
    </div>

    <!-- ── ONGLET 3 : UPLOAD ──────────────────────────────────────────────── -->
    <div *ngIf="activeTab === 'upload'">
      <p class="text-muted small mb-3">
        Uploadez le document produit préparé en dehors du système
        (Word exporté en PDF, document scanné, acte signé...).
        Les variables <code>{{ '{' }}{{ '{' }}variable{{ '}' }}{{ '}' }}</code> ne seront
        <strong>pas remplacées</strong> — le fichier est enregistré tel quel.
      </p>

      <div class="form-group mb-3">
        <label class="fw-semibold">Document produit (PDF)</label>
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
        Uploader le document
        <app-loading [isVisible]="loading"></app-loading>
      </button>
    </div>

  </div>

  <!-- Footer — Soumettre au circuit -->
  <div class="card-footer d-flex justify-content-between align-items-center"
       *ngIf="acte?.file_url && countdown === null">
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
    <div *ngIf="pdfLoadError" class="p-4 text-center">
      <div class="alert alert-warning">
        <i class="bi bi-exclamation-triangle-fill me-2"></i>
        Impossible d'afficher le document.<br>
        <strong>Le document est disponible</strong> — rechargez la page pour accéder au bouton de soumission.
      </div>
      <button class="btn btn-primary mt-2" (click)="rechargerPage()">
        <i class="bi bi-arrow-clockwise me-1"></i>Recharger la page
      </button>
    </div>
    <ngx-extended-pdf-viewer *ngIf="!pdfLoadError"
      [src]="pdfSrc" height="80vh" useBrowserLocale="true"
      (pdfLoadingFailed)="pdfLoadError = true">
    </ngx-extended-pdf-viewer>
  </div>
</ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    app-document-editor quill-editor { display: block; margin-top: 8px; }
    app-document-editor .ql-container { min-height: 500px; }
    app-document-editor .ql-editor   { min-height: 500px; font-size: 13px; }
    app-document-editor .ql-toolbar .ql-html { width: 28px; height: 24px; padding: 3px; display: inline-flex; align-items: center; justify-content: center; }
    app-document-editor .ql-toolbar .ql-html svg { width: 16px; height: 16px; }
    .offcanvas-wide { min-width: 70vw !important; width: 70vw !important; }
  `],
})
export class DocumentEditorComponent implements OnInit, OnDestroy {
  private static quillRegistered = false;
  private static htmlButtonOk    = false;

  @Input() requeteId!: number;
  @Input() contentType!: number;
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
  pdfLoadError = false;
  selectedFile: File | null = null;
  countdown: number | null = null;

  private countdownTimer: any = null;

  formData = {
    title:       '',
    content:     '',
    conclusion:  '',
    htmlContent: '',
  };

  quillModules: any = null;

  private genererEditor: any = null;

  private baseUrl = ConfigService.toApiUrl('document-actes');
  @ViewChild('pdfOffcanvas') pdfOffcanvasRef!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private offcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.initQuill(); // appelle initialiser() en fin de chaîne async
  }

  // ── Enregistrement du plugin HTML source ─────────────────────────────────
  private async initQuill(): Promise<void> {
    const Quill = (await import('quill')).default;

    if (!DocumentEditorComponent.quillRegistered) {
      try {
        const mod: any = await import('quill-html-edit-button');
        // UMD/CJS interop : esbuild (prod) et webpack (dev) exposent la classe
        // sous des formes différentes — on sonde tous les emplacements connus.
        const candidates = [
          mod?.default,
          mod?.default?.default,
          mod,
          mod?.HtmlEditButton,
          mod?.default?.HtmlEditButton,
        ];
        const HtmlEditButton: any =
          candidates.find(c => typeof c === 'function')
          ?? (Object.values(mod?.default ?? {}).find((v: any) => typeof v === 'function') as any)
          ?? (Object.values(mod ?? {}).find((v: any) => typeof v === 'function') as any)
          ?? null;
        if (HtmlEditButton) {
          Quill.register('modules/htmlEditButton', HtmlEditButton, true);
          DocumentEditorComponent.htmlButtonOk = true;
        }
      } catch { /* module indisponible — on continue sans le bouton HTML */ }
      DocumentEditorComponent.quillRegistered = true;
    }

    const toolbar = [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ];

    this.quillModules = DocumentEditorComponent.htmlButtonOk
      ? {
          toolbar,
          htmlEditButton: {
            buttonHTML: '<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><polyline points="5,4 1,9 5,14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13,4 17,9 13,14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="3" x2="8" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
            buttonTitle: 'Voir / éditer le code source HTML',
          },
        }
      : { toolbar };

    this.initialiser();
  }

  // ── Initialisation ────────────────────────────────────────────────────────
  initialiser(): void {
    this.loading = true;
    this.http.get<any>(`${this.baseUrl}/init/${this.requeteId}/${this.docProduitId}`)
      .subscribe({
        next: (res) => {
          this.loading      = false;
          this.acte         = { ...res.data.acte };
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
          }else{
            this.formData.htmlContent     = res.data?.doc_produit?.content ?? '';
          }

           switch (this.contentType) {
              case 0: // Demande d'agrément
                this.activeTab ='generer';
                break;
              case 1: // Demande d'agrément
                this.activeTab ='wysiwyg';
              break;
              case 2: // Rapport d'inspection
                this.activeTab ='upload';
                break;
                case 3: // Rapport d'inspection
                this.activeTab ='aucun';
                break;
              default:
                this.toastr.error('Type de contenu inconnu pour l\'éditeur de document');
                return;
            }
        },
        error: () => {
          this.loading = false;
          this.toastr.error('Impossible d\'initialiser le document');
        }
      });
  }

  onGenererEditorCreated(editor: any): void {
    this.genererEditor = editor;
  }

  // ── Insérer variable au curseur dans l'éditeur Quill ─────────────────────
  insererVariable(key: string): void {
    const text = `{{${key}}}`;
    if (this.genererEditor) {
      const range = this.genererEditor.getSelection(true);
      const index = range ? range.index : this.genererEditor.getLength() - 1;
      this.genererEditor.insertText(index, ` ${text} `, 'user');
      this.genererEditor.setSelection(index + text.length + 2, 0);
    } else {
      this.formData.content += ` ${text} `;
    }
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
        this.acte    = { ...res.data.acte };
        this.toastr.success('Document généré avec succès');
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Génération échouée');
      }
    });
  }

  get isPns(): boolean {
    return this.acte?.doc_produit?.generate_from === 'pns';
  }

  get isPending(): boolean {
    return this.acte?.status === 'en_attente_pns';
  }

  ngOnDestroy(): void {
    this.clearCountdown();
  }

  // ── Sauvegarder WYSIWYG ───────────────────────────────────────────────────
  sauvegarderWysiwyg(): void {
    this.clearCountdown();
    this.loading = true;
    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/sauvegarder`, {
      title:        this.formData.title,
      html_content: this.formData.htmlContent,
      conclusion:   this.formData.conclusion,
    }).subscribe({
      next: (res) => {
        this.loading = false;
        this.acte    = { ...res.data.acte };
        if (res.data.pending) {
          this.toastr.info('Contenu envoyé au PNS — vérification dans 5s');
          this.startPnsCountdown();
        } else {
          this.toastr.success('Document sauvegardé et PDF généré');
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Sauvegarde échouée');
      }
    });
  }

  private startPnsCountdown(): void {
    this.countdown = 10;
    this.countdownTimer = setInterval(() => {
      if (this.countdown! > 1) {
        this.countdown!--;
      } else {
        this.clearCountdown();
        this.checkPnsCallback();
      }
    }, 1000);
  }

  private clearCountdown(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.countdown = null;
  }

  verifierStatutPns(): void {
    this.loading = true;
    this.checkPnsCallback();
  }

  private checkPnsCallback(): void {
    this.http.get<any>(`${this.baseUrl}/init/${this.requeteId}/${this.docProduitId}`)
      .subscribe({
        next: (res) => {
          this.loading = false;
          const acte = res.data.acte;
          if (acte?.file_url) {
            this.toastr.success('Document reçu du PNS — prêt à soumettre');
            this.acte = { ...acte }; // nouvelle référence → change detection + footer visible
          } else {
            this.acte = { ...acte }; // status reste 'en_attente_pns' → bandeau + bouton Vérifier
            this.toastr.info('Document pas encore disponible — réessayez dans quelques secondes');
          }
        },
        error: () => { this.loading = false; }
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
          this.acte         = { ...res.data.acte };
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
  this.pdfLoadError = false;
  this.pdfSrc = ConfigService.toFile(this.acte.file_url);
  this.offcanvasService.open(this.pdfOffcanvasRef, {
    position: 'end',
    panelClass: 'offcanvas-wide',
  });
}

rechargerPage(): void {
  window.location.reload();
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