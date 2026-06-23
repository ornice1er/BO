import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbOffcanvas, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import {} from '../../../../../../core/pipes/sample-search.pipe';
import { RequeteService } from '../../../../../../core/services/requete.service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../../../core/utils/app-error-show';
import { DocumentActeService } from '../../../../../../core/services/document-acte.service';
import { DocumentEditorComponent } from '../../../../../components/document-editor/document-editor.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'ngx-eservice-traitement-edit',
  templateUrl: './eservice-traitement-edit.component.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgxExtendedPdfViewerModule, DocumentEditorComponent, QuillModule
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./eservice-traitement-edit.component.css']
})
export class EserviceTraitementEditComponent implements OnInit {

  @ViewChild('contentPDF') contentPDF: TemplateRef<any> | undefined;
  @ViewChild('editeurOffcanvas') editeurOffcanvasRef!: TemplateRef<any>;

  // ── Données ────────────────────────────────────────────────────────────────
  selectedData: any;
  user: any;
  code: any;
  prestation: any;
  myPrestation: any;
  permissions: any[] = [];

  // ── Workflow nouveau moteur ────────────────────────────────────────────────
  transitionsDisponibles: any[] = [];   // transitions depuis l'étape courante
  transitionSelectionnee: any = null;   // transition choisie dans le ng-select
  motifsRejet: any[] = [];              // motifs de rejet pour l'étape courante

  // ── Formulaire de réponse ──────────────────────────────────────────────────
  responseData: any = {
    transition_id: null,  // ✅ remplace eps_id
    comment:       '',
    motif_id:      null,
    metadata:      {},
  };

  // ── UI ─────────────────────────────────────────────────────────────────────
  loading = false;
  pdfSrc: string | null = null;
  rdvDate: string | null = null;
  fileUploaded: File | null = null;
  sharePjToPns = false;
  noteFilePath: string | null = null;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['clean'],
    ],
  };

  showAddingField = {
    rdv:          false,
    observation:  true,   // toujours visible par défaut
    note_file:    false,
  };

  // Circuit documentaire
documentsDuCircuit: any[] = [];
  docProduitCourant: any = null;
  documentDejaSoumis = false;
  acteAModifier: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locService: LocalStorageService,
    private requeteService: RequeteService,
    private router: Router,
    private toastr: ToastrService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal,
    private docActeService: DocumentActeService,
  ) {}

  // ── Initialisation ─────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.code       = this.activatedRoute.snapshot.paramMap.get('code');
      this.prestation = this.activatedRoute.snapshot.paramMap.get('slug');
      this.user       = this.locService.get(GlobalName.userName);
      this.permissions = this.user.roles?.[0]?.permissions ?? [];
      this.myPrestation = this.user.user_prestations
        ?.find((el: any) => el.prestation.code === this.prestation)?.prestation;
    });

    this.get();
  }

  // ── Chargement demande + transitions ──────────────────────────────────────
get(): void {
  this.requeteService.getOne(this.code).subscribe({
    next: (res: any) => {
      this.selectedData = res.data;
 
      // Charger les transitions
      this.chargerTransitionsDisponibles();
      this.chargerMotifsRejet();
 
      // Charger les documents du circuit
      this.documentsDuCircuit = res.data?.document_actes ?? [];
 
      // Identifier le doc produit pour l'étape courante
      this.identifierDocProduitCourant();
 
      // Vérifier si le document a déjà été soumis
     this.documentDejaSoumis = this.documentsDuCircuit.some(
        (a: any) => (a.status === 'en_circuit' || a.status === 'complet')
                && a.doc_produit?.etape_edition_id === this.selectedData?.current_etape_id
      );
    },
    error: () => this.toastr.error('Impossible de charger la demande')
  });
}

  /**
   * Charge les transitions disponibles depuis l'étape courante.
   * Remplace getWorkflow() qui utilisait eps?.etape?.id.
   */
  chargerTransitionsDisponibles(): void {
    if (!this.selectedData?.prestation_id || !this.selectedData?.current_etape_id) return;

    this.requeteService.getTransitionsDisponibles(
      this.selectedData.prestation_id,
      this.selectedData.current_etape_id
    ).subscribe({
      next: (res: any) => {
        this.transitionsDisponibles = res.data ?? [];
      },
      error: () => {
        this.toastr.error('Impossible de charger les transitions');
        this.transitionsDisponibles = [];
      }
    });
  }

  chargerMotifsRejet(): void {
    if (!this.selectedData?.prestation_id || !this.selectedData?.current_etape_id) return;

    this.requeteService.getMotifsRejet(
      this.selectedData.prestation_id,
      this.selectedData.current_etape_id
    ).subscribe({
      next: (res: any) => { this.motifsRejet = res.data ?? []; },
      error: () => { this.motifsRejet = []; }
    });
  }

  // ── Sélection d'une transition ─────────────────────────────────────────────
  onTransitionChange(transitionId: any): void {
    this.transitionSelectionnee = this.transitionsDisponibles
      .find((t: any) => t.id === transitionId) ?? null;

    // Réinitialiser les champs additionnels
    this.showAddingField = { rdv: false, observation: true, note_file: false };
    this.responseData.motif_id = null;
    this.fileUploaded  = null;
    this.sharePjToPns  = false;
    this.noteFilePath  = null;

    if (!this.transitionSelectionnee) return;

    const condition = this.transitionSelectionnee.condition_type;

    // Afficher les champs selon le type de transition
    if (condition === 'validation') {
      this.showAddingField.note_file = true;
    }
    // if (condition === 'validation' && this.myPrestation?.need_meeting) {
    //   this.showAddingField.rdv = true;
    // }
  }

  // ── Soumission ─────────────────────────────────────────────────────────────
  soumettre(): void {
    if (!this.responseData.transition_id) {
      this.toastr.warning('Veuillez sélectionner une action');
      return;
    }

    const transition = this.transitionSelectionnee;
    const label = `${transition?.etape_to?.name ?? 'cette étape'} — Confirmer ?`;

    AppSweetAlert.confirmBox('warning','Traitement de demande',label).then((result: any) => {
      if (!result.isConfirmed) return;

      this.loading = true;

      const decisionMap: Record<string, string> = {
        auto:          'valider',
        validation:    'valider',
        rejet:         'rejeter',
        complement:    'completer',
        signature:     'signer',
        paraphe:       'parapher',
        prevalidation: 'prevalider',
        cloture:       'cloturer',
        choix_sortie:  'valider',
        correction:    'retour_correction',
      };

      const decision = decisionMap[transition?.condition_type] ?? 'valider';
      const metadata: any = {};
      if (this.rdvDate) metadata.rdv_date = this.rdvDate;

      if (this.fileUploaded) {
        this.requeteService.uploadNoteFile(this.selectedData.id, this.fileUploaded).subscribe({
          next: (uploadRes: any) => {
            const signedUrl  = this.sharePjToPns ? (uploadRes?.data?.signed_url ?? null) : null;
            const filePath   = uploadRes?.data?.path ?? null;
            this._envoyerTraiter(decision, metadata, signedUrl, filePath);
          },
          error: (err: any) => {
            this.loading = false;
            this.toastr.error(err?.error?.message ?? 'Erreur lors de l\'upload du fichier');
          }
        });
      } else {
        this._envoyerTraiter(decision, metadata, null, null);
      }
    });
  }

  private _envoyerTraiter(decision: string, metadata: any, link: string | null, noteFilePath: string | null): void {
    this.requeteService.traiter(this.selectedData.id, {
      decision,
      comment:         this.responseData.comment  || null,
      motif_id:        this.responseData.motif_id || null,
      metadata,
      link,
      note_file_path:  noteFilePath,
      // Transition EXACTE choisie (lève l'ambiguïté quand plusieurs transitions
      // partagent le même condition_type depuis l'étape courante)
      transition_id:   this.transitionSelectionnee?.id ?? this.responseData.transition_id ?? null,
    }).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Décision enregistrée avec succès');
        this.router.navigate([
          'admin/eservice/espace-traitement-show/' +
          this.selectedData.code + '/' + this.myPrestation?.code
        ]);
      },
      error: (err: any) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Opération échouée');
      }
    });
  }

  // ── Utilitaires ────────────────────────────────────────────────────────────
  upload(event: any): void {
    if (event.target.files.length > 0) {
      this.fileUploaded = event.target.files[0] as File;
    } else {
      this.fileUploaded = null;
      this.sharePjToPns = false;
    }
  }

  showResponseFile(name: any): void {
    this.pdfSrc = `${ConfigService.toFile('storage')}/${name}`;
    this.offcanvasService.open(this.contentPDF, { panelClass: 'details-panel', position: 'start' });
  }

  generateMessage(): void {
    if (!this.rdvDate) return;
    const date = new Date(this.rdvDate);
    this.responseData.comment =
      `Votre entretien est programmé le ${date.toLocaleDateString()} ` +
      `à ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. ` +
      `Merci de vous présenter à l'heure avec les pièces nécessaires.`;
  }

  back(): void {
    this.router.navigate([
      'admin/eservice/espace-traitement-show/' +
      this.selectedData?.code + '/' + this.prestation
    ]);
  }

  hasPermission(permission: string): boolean {
    return this.permissions?.some((e: any) => e.name === permission) ?? false;
  }


  get docProduitId(): number {
  return this.selectedData?.document_actes?.[0]?.doc_produit_id
      ?? this.myPrestation?.doc_produits?.[0]?.id;
}



// ── AJOUTER ces méthodes ───────────────────────────────────────────────────
 
/**
 * Identifie le document produit configuré pour l'étape courante
 * en comparant template_key avec etape_edition_id
 */
identifierDocProduitCourant(): void {
  console.log('current_etape_id:', this.selectedData?.current_etape_id);
  console.log('prestation_id:', this.selectedData?.prestation_id);
  console.log('documentsDuCircuit:', this.documentsDuCircuit);

  if (!this.selectedData?.current_etape_id) {
    this.docProduitCourant = null;
    return;
  }

  const acteExistant = this.documentsDuCircuit.find(
    (a: any) => a.status === 'en_edition'
  );
  console.log('acteExistant:', acteExistant);

  if (acteExistant) {
    this.docProduitCourant = acteExistant.doc_produit;
    return;
  }

  this.docActeService.getDocProduit(
    this.selectedData.prestation_id,
    this.selectedData.current_etape_id,
    this.selectedData.id
  ).subscribe({
    next: (res: any) => {
      console.log('getDocProduit response:', res);
      this.docProduitCourant = res.data ?? null;
    },
    error: (err:any) => {
      console.error('getDocProduit error:', err);
      this.docProduitCourant = null;
    }
  });
}
/** Vérifie si l'agent peut agir sur un document du circuit */
peutAgirSurDocument(acte: any): boolean {
  if (!acte?.current_circuit_step) return false;
  const roleAgent = this.user?.roles?.[0]?.name;
  return acte.current_circuit_step.role_name === roleAgent
      && acte.status === 'en_circuit';
}
 
/** Exécute l'action sur un document du circuit */
actionSurDocument(acte: any): void {
  const action = acte?.current_circuit_step?.action_type;
  if (!action) return;
 
  AppSweetAlert.confirmBox(`Confirmer : ${action} sur ce document ?`).then((r: any) => {
    if (!r.isConfirmed) return;
    this.loading = true;
    this.requeteService.traiterDocument(acte.id, { action }).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success('Action effectuée');
        this.get();
      },
      error: (err: any) => {
        this.loading = false;
        this.toastr.error(err?.error?.message ?? 'Opération échouée');
      }
    });
  });
}
 
/** Appelé quand le document est soumis depuis l'éditeur (première édition) */
onDocumentSoumis(_data: any): void {
  this.toastr.success('Document soumis au circuit de signature');
  this.get();
}

/** Ouvre l'offcanvas de modification sur un document déjà en circuit */
modifierDocument(acte: any): void {
  this.acteAModifier = acte;
  this.offcanvasService.open(this.editeurOffcanvasRef, {
    position: 'end',
    panelClass: 'offcanvas-wide',
  });
}

/** Appelé quand le document est re-généré depuis l'offcanvas de modification */
onDocumentModifie(): void {
  this.offcanvasService.dismiss();
  this.toastr.success('Document modifié et re-généré');
  this.get();
}
 
/** Vérifie si l'étape nécessite une édition (pas encore en circuit).
 *  Aligné sur la nouvelle archi : l'étape produit un document ssi un
 *  EtapeDocumentProduit est configuré (résolu dans docProduitCourant). */
etapeNecessiteEdition(): boolean {
  return !!this.docProduitCourant
      && !this.documentDejaSoumis;
}
 


























}