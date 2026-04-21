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
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { RequeteService } from '../../../../../../core/services/requete.service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { DocumentActeService } from '../../../../../../core/services/document-acte.service';
import { DocumentEditorComponent } from '../../../../../components/document-editor/document-editor.component';

@Component({
  selector: 'ngx-eservice-traitement-edit',
  templateUrl: './eservice-traitement-edit.component.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgxExtendedPdfViewerModule,DocumentEditorComponent
  ],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./eservice-traitement-edit.component.css']
})
export class EserviceTraitementEditComponent implements OnInit {

  @ViewChild('contentPDF') contentPDF: TemplateRef<any> | undefined;

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
  fileUploaded: any = null;

  showAddingField = {
    rdv:          false,
    observation:  true,   // toujours visible par défaut
    note_file:    false,
  };

  // Circuit documentaire
documentsDuCircuit: any[] = [];    // document_actes liés à la requête
docProduitCourant: any = null;     // doc produit configuré pour l'étape courante
documentDejaSoumis = false;  

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

    if (!this.transitionSelectionnee) return;

    const condition = this.transitionSelectionnee.condition_type;

    // Afficher les champs selon le type de transition
    if (condition === 'validation' && this.myPrestation?.need_validation) {
      this.showAddingField.note_file = true;
    }
    if (condition === 'validation' && this.myPrestation?.need_meeting) {
      this.showAddingField.rdv = true;
    }
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

      // Mapper condition_type → decision pour le moteur
      const decisionMap: Record<string, string> = {
        auto:          'valider',
        validation:    'valider',
        rejet:         'rejeter',
        complement:    'completer',
        signature:     'signer',
        paraphe:       'parapher',
        prevalidation: 'prevalider',
        cloture:       'cloturer',
      };

      const decision = decisionMap[transition?.condition_type] ?? 'valider';

      const metadata: any = {};
      if (this.rdvDate) metadata.rdv_date = this.rdvDate;

      this.requeteService.traiter(this.selectedData.id, {
        decision,
        comment:  this.responseData.comment  || null,
        motif_id: this.responseData.motif_id || null,
        metadata,
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
    });
  }

  // ── Utilitaires ────────────────────────────────────────────────────────────
  upload(event: any): void {
    if (event.target.files.length > 0) {
      this.fileUploaded = event.target.files[0];
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
    this.selectedData.current_etape_id
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
 
/** Appelé quand le document est soumis depuis l'éditeur */
onDocumentSoumis(data: any): void {
  this.toastr.success('Document soumis au circuit de signature');
  this.get(); // Recharger — documentDejaSoumis passera à true
}
 
/** Vérifie si l'étape nécessite une édition (pas encore en circuit) */
etapeNecessiteEdition(): boolean {
  return this.selectedData?.current_etape?.produces_document === true
      && !this.documentDejaSoumis;
}
 


























}