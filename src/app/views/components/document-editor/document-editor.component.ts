// ─── document-editor.component.ts ───────────────────────────────────────────
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
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
        <div class="d-flex justify-content-between align-items-center">
          <label class="fw-semibold mb-0">Corps du document</label>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-info"
                    (click)="showApercu = !showApercu">
              <i class="bi bi-eye me-1"></i>{{ showApercu ? 'Masquer' : 'Aperçu' }}
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary"
                    (click)="ouvrirHtmlSource('content')">
              <i class="bi bi-code-slash me-1"></i>Code source
            </button>
          </div>
        </div>
        <div class="border rounded p-2 bg-light small mt-1" *ngIf="variableKeys.length">
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

        <!-- Aperçu live : valeurs interpolées -->
        <div *ngIf="showApercu" class="mt-2 border rounded">
          <div class="px-2 py-1 bg-light small fw-semibold text-muted border-bottom">
            <i class="bi bi-eye me-1"></i>Aperçu (variables remplacées par leurs valeurs)
          </div>
          <div class="p-3" [innerHTML]="apercuHtml"></div>
        </div>
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
        <div class="d-flex justify-content-between align-items-center">
          <label class="fw-semibold mb-0">Corps du document</label>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-sm btn-outline-info"
                    (click)="showApercu = !showApercu">
              <i class="bi bi-eye me-1"></i>{{ showApercu ? 'Masquer' : 'Aperçu' }}
            </button>
            <button type="button" class="btn btn-sm btn-outline-secondary"
                    (click)="ouvrirHtmlSource('htmlContent')">
              <i class="bi bi-code-slash me-1"></i>Code source
            </button>
          </div>
        </div>
        <div class="border rounded p-2 bg-light small mt-1" *ngIf="variableKeys.length">
          <p class="mb-1 text-muted fw-semibold">Variables disponibles — cliquer pour insérer au curseur :</p>
          <span *ngFor="let v of variableKeys"
                class="badge bg-secondary me-1 mb-1"
                (click)="insererVariable(v)"
                style="cursor:pointer; user-select:none">
            {{ '{' }}{{ '{' }}{{ v }}{{ '}' }}{{ '}' }}
          </span>
        </div>
        <quill-editor
          [(ngModel)]="formData.htmlContent"
          [modules]="quillModules"
          (onEditorCreated)="onWysiwygEditorCreated($event)"
          placeholder="Rédigez le contenu...">
        </quill-editor>

        <!-- Aperçu live : valeurs interpolées -->
        <div *ngIf="showApercu" class="mt-2 border rounded">
          <div class="px-2 py-1 bg-light small fw-semibold text-muted border-bottom">
            <i class="bi bi-eye me-1"></i>Aperçu (variables remplacées par leurs valeurs)
          </div>
          <div class="p-3" [innerHTML]="apercuHtml"></div>
        </div>
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

      <!-- Partage au Portail national des services -->
      <div class="border rounded p-3 mb-3 bg-light">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="shareToPns"
                 [(ngModel)]="shareToPns" [ngModelOptions]="{ standalone: true }">
          <label class="form-check-label fw-semibold" for="shareToPns">
            Partager ce document au Portail national (PNS)
          </label>
        </div>
        <small class="text-muted d-block mt-1">
          Le lien du fichier uploadé est transmis au PNS, qui le met à disposition de l'usager.
        </small>

        <div class="row g-2 mt-2" *ngIf="shareToPns">
          <div class="col-md-5">
            <label class="form-label small mb-1">Clé de décision PNS</label>
            <input type="text" class="form-control form-control-sm"
                   [(ngModel)]="pnsDecision" [ngModelOptions]="{ standalone: true }"
                   placeholder="ex : sign_doc, gendoc…">
          </div>
          <div class="col-md-7">
            <label class="form-label small mb-1">Observations (optionnel)</label>
            <input type="text" class="form-control form-control-sm"
                   [(ngModel)]="pnsComment" [ngModelOptions]="{ standalone: true }"
                   placeholder="Message joint au document">
          </div>
        </div>
      </div>

      <button class="btn btn-primary" (click)="uploadPdf()"
              [disabled]="!selectedFile || loading">
        <i class="bi bi-upload me-1"></i>
        {{ shareToPns ? 'Uploader et partager au PNS' : 'Uploader le document' }}
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

<!-- Modal code source HTML -->
<ng-template #htmlSourceModal let-modal>
  <div class="modal-header">
    <h5 class="modal-title">
      <i class="bi bi-code-slash me-2"></i>Code source HTML
    </h5>
    <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
  </div>
  <div class="modal-body p-0">
    <textarea class="form-control font-monospace border-0 rounded-0"
              style="height: 60vh; resize: none; font-size: 12px;"
              [(ngModel)]="htmlModalBuffer">
    </textarea>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss()">Annuler</button>
    <button type="button" class="btn btn-primary" (click)="appliquerHtmlSource(modal)">
      <i class="bi bi-check2 me-1"></i>Appliquer
    </button>
  </div>
</ng-template>

<!-- Template offcanvas PDF -->
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
    .offcanvas-wide { min-width: 70vw !important; width: 70vw !important; }
  `],
})
export class DocumentEditorComponent implements OnInit, OnDestroy {

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

  /** Onglet Upload — partage du fichier uploadé au Portail national. */
  shareToPns  = false;
  pnsDecision = '';
  pnsComment  = '';
  countdown: number | null = null;

  private countdownTimer: any = null;

  formData = {
    title:       '',
    content:     '',
    conclusion:  '',
    htmlContent: '',
  };

  quillModules = {
    toolbar: [
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
    ],
  };

  // ── Modal code source HTML ────────────────────────────────────────────────
  htmlModalBuffer = '';
  private htmlModalTarget: 'content' | 'htmlContent' = 'htmlContent';

  private genererEditor: any = null;
  private wysiwygEditor: any = null;
  showApercu = false;

  private baseUrl = ConfigService.toApiUrl('document-actes');
  @ViewChild('pdfOffcanvas')   pdfOffcanvasRef!:   TemplateRef<any>;
  @ViewChild('htmlSourceModal') htmlSourceModalRef!: TemplateRef<any>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.initialiser();
  }

  ouvrirHtmlSource(target: 'content' | 'htmlContent'): void {
    this.htmlModalTarget = target;
    this.htmlModalBuffer = this.formData[target];
    this.modalService.open(this.htmlSourceModalRef, { size: 'lg', scrollable: true });
  }

  appliquerHtmlSource(modal: any): void {
    this.formData[this.htmlModalTarget] = this.htmlModalBuffer;
    modal.close();
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
            // Contenu prédéfini du document produit : préchargé dans le corps
            // du volet « Générer » ET dans l'« Éditeur ».
            const predefini = res.data?.doc_produit?.content ?? '';
            this.formData.content     = predefini;
            this.formData.htmlContent = predefini;
          }

           // Génération depuis le PNS → onglet « Éditeur » présélectionné
           if ((res.data?.doc_produit?.generate_from) === 'pns') {
              this.activeTab = 'wysiwyg';
           } else {
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

  onWysiwygEditorCreated(editor: any): void {
    this.wysiwygEditor = editor;
  }

  // ── Insérer une variable au curseur de l'éditeur de l'onglet actif ───────
  insererVariable(key: string): void {
    const text = `{{${key}}}`;
    const isWysiwyg = this.activeTab === 'wysiwyg';
    const editor    = isWysiwyg ? this.wysiwygEditor : this.genererEditor;
    const field: 'content' | 'htmlContent' = isWysiwyg ? 'htmlContent' : 'content';

    if (editor) {
      const range = editor.getSelection(true);
      const index = range ? range.index : editor.getLength() - 1;
      editor.insertText(index, ` ${text} `, 'user');
      editor.setSelection(index + text.length + 2, 0);
    } else {
      this.formData[field] += ` ${text} `;
    }
  }

  // ── Aperçu live : remplace les {{variable}} par leurs valeurs ────────────
  interpoler(html: string): string {
    if (!html) return '';
    return html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m: string, key: string) => {
      const val = this.variables?.[key];
      return (val !== undefined && val !== null && val !== '') ? String(val) : m;
    });
  }

  get apercuHtml(): string {
    const src = this.activeTab === 'wysiwyg' ? this.formData.htmlContent : this.formData.content;
    return this.interpoler(src ?? '');
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

    if (this.shareToPns) {
      formData.append('share_to_pns', '1');
      if (this.pnsDecision) formData.append('decision', this.pnsDecision);
      if (this.pnsComment)  formData.append('comment', this.pnsComment);
    }

    this.http.post<any>(`${this.baseUrl}/${this.acte.id}/upload`, formData)
      .subscribe({
        next: (res) => {
          this.loading      = false;
          this.acte         = { ...res.data.acte };
          this.selectedFile = null;
          this.toastr.success(
            this.shareToPns
              ? 'PDF uploadé et partagé au PNS'
              : 'PDF uploadé avec succès'
          );
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