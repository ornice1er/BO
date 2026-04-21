import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModule, NgbModalConfig, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { RequeteService } from '../../../../../../core/services/requete.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LoadingComponent } from '../../../../../components/loading/loading.component';

@Component({
  selector: 'ngx-eservice-traitement-show',
  templateUrl: './eservice-traitement-show.component.html',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, RouterModule
  ],
  styleUrls: ['./eservice-traitement-show.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class EserviceTraitementShowComponent implements OnInit {

  // ── Données ────────────────────────────────────────────────────────────────
  selected_data: any = undefined;
  user: any;
  myPrestation: any;
  code: any;
  prestation: any;
  stepContents: any[] = [];
  motifsRejet: any[] = [];

  // ── État UI ────────────────────────────────────────────────────────────────
  loading = false;
  peutAgir = false;
  pdfSrc: SafeResourceUrl | undefined;
  pdfTitle = '';

  @ViewChild('pdfViewerCanvas') pdfViewerCanvas!: TemplateRef<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locService: LocalStorageService,
    private requeteService: RequeteService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private toastrService:ToastrService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // ── Initialisation ─────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.selected_data = undefined;
      this.code       = this.activatedRoute.snapshot.paramMap.get('code');
      this.prestation = this.activatedRoute.snapshot.paramMap.get('slug');
      this.user       = this.locService.get(GlobalName.userName);
      this.myPrestation = this.user.user_prestations
        .find((el: any) => el.prestation.code === this.prestation)?.prestation;
      this.get();
    });
  }

  creerRdv(){
  if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
    this.locService.set("selected_data",this.selected_data)
    this.router.navigate(['admin/agenda/'])
  }

  // ── Chargement de la demande ───────────────────────────────────────────────
  get(): void {
    this.requeteService.getOne(this.code, this.prestation).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.selected_data = res.data;
        this.stepContents  = res.data?.step_contents ?? [];

        // Vérifier si l'agent connecté peut agir sur cette demande
        this.checkPeutAgir();

        // Charger les motifs de rejet pour l'étape courante
        this.loadMotifsRejet();
      },
      error: () => {
        this.toastr.error('Impossible de charger la demande');
      }
    });
  }

  // ── Vérifier si l'agent peut agir ─────────────────────────────────────────
  checkPeutAgir(): void {
    if (!this.selected_data?.id) return;

    this.requeteService.peutAgir(this.selected_data.id).subscribe({
      next: (res: any) => {
        this.peutAgir = res.data?.peut_agir ?? false;
      },
      error: () => { this.peutAgir = false; }
    });
  }

  // ── Charger les motifs de rejet ────────────────────────────────────────────
  loadMotifsRejet(): void {
    if (!this.selected_data?.prestation_id || !this.selected_data?.current_etape_id) return;

    this.requeteService.getMotifsRejet(
      this.selected_data.prestation_id,
      this.selected_data.current_etape_id
    ).subscribe({
      next: (res: any) => { this.motifsRejet = res.data ?? []; },
      error: () => { this.motifsRejet = []; }
    });
  }

  // ── PRISE EN CHARGE ────────────────────────────────────────────────────────
  prendreEnCharge(): void {
    AppSweetAlert.confirmBox('warning','Traitement de la demande','Confirmer la prise en charge de cette demande ?').then((result: any) => {
      if (!result.isConfirmed) return;
      this.loading = true;
      this.requeteService.prendreEnCharge(this.selected_data.id).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Demande prise en charge');
          this.get();
        },
        error: (err: any) => {
          this.loading = false;
          this.toastr.error(err?.error?.message ?? 'Opération échouée');
        }
      });
    });
  }

  // ── TRAITEMENT (valider / rejeter / parapher / signer / prévalider) ────────
  traiter(decision: string, options: any = {}): void {
    const labels: Record<string, string> = {
      valider:     'Valider cette demande ?',
      rejeter:     'Rejeter cette demande ?',
      parapher:    'Apposer votre paraphe sur ce document ?',
      signer:      'Signer définitivement ce document ?',
      prevalider:  'Pré-valider cette demande ?',
      cloturer:    'Clôturer définitivement cette demande ?',
    };

    AppSweetAlert.confirmBox('warning','Traitement de la demande',labels[decision] ?? 'Confirmer ?').then((result: any) => {
      if (!result.isConfirmed) return;
      this.loading = true;

      this.requeteService.traiter(this.selected_data.id, {
        decision,
        comment:  options.comment  ?? null,
        motif_id: options.motif_id ?? null,
        metadata: options.metadata ?? {},
      }).subscribe({
        next: () => {
          this.loading = false;
          this.modalService.dismissAll();
          this.toastr.success('Opération effectuée avec succès');
          this.get();
        },
        error: (err: any) => {
          this.loading = false;
          this.toastr.error(err?.error?.message ?? 'Opération échouée');
        }
      });
    });
  }

  // ── Soumission du formulaire de traitement (modal dialogTraiter) ───────────
  submitTraitement(value: any): void {
    if (!value.decision) {
      this.toastr.warning('Veuillez choisir une décision');
      return;
    }
    this.traiter(value.decision, {
      comment:  value.comment  ?? null,
      motif_id: value.motif_id ?? null,
    });
  }

  // ── Action sur un document du circuit (paraphe, signature...) ─────────────
peutAgirSurDocument(acte: any): boolean {
  if (!acte?.current_circuit_step) return false;
  const roleAgent = this.user?.roles?.[0]?.name;
  return acte.current_circuit_step.role_name === roleAgent
      && acte.status === 'en_circuit';
}
actionSurDocument(acte: any): void {
  const action = acte?.current_circuit_step?.action_type;
  if (!action) return;

  AppSweetAlert.confirmBox('warning','Traitement du document',`Confirmer : ${action} sur ce document ?`).then((r: any) => {
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
  traiterDocument(acte: any): void {
    const action = acte?.current_circuit_step?.action_type;
    if (!action) return;

    AppSweetAlert.confirmBox('warning','Traitement du document',`Confirmer l'action : ${action} ?`).then((result: any) => {
      if (!result.isConfirmed) return;
      this.loading = true;

      this.requeteService.traiterDocument(acte.id, { action }).subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Action sur le document effectuée');
          this.get();
        },
        error: (err: any) => {
          this.loading = false;
          this.toastr.error(err?.error?.message ?? 'Opération échouée');
        }
      });
    });
  }

  // ── Visualisation fichiers ─────────────────────────────────────────────────
  showFile(el: any): void {
    this.openPdfOffcanvas(el.url, el.name ?? 'Fichier');
  }

  showResponseFile(url: string): void {
    this.openPdfOffcanvas(url, 'Document');
  }

  showDocumentActe(acte: any): void {
    if (!acte?.file_url) return;
    this.openPdfOffcanvas(acte.file_url, acte?.doc_produit?.name ?? 'Document produit');
  }

  private openPdfOffcanvas(url: string, title: string): void {
    this.pdfSrc   = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.pdfTitle = title;
    console.log( this.pdfSrc  );
    this.offcanvasService.open(this.pdfViewerCanvas, {
      position: 'end',
      panelClass: 'offcanvas-pdf',
      scroll: true,
    });
  }

  // ── Modals ─────────────────────────────────────────────────────────────────
  open(content: any): void {
    this.modalService.open(content);
  }

  open2(): void {
    // Navigation vers la page d'édition (traitement détaillé)
    this.locService.set('selected_data', this.selected_data);
    this.router.navigate([
      'admin/eservice/espace-traitement-edit/' + this.selected_data.code + '/' + this.prestation
    ]);
  }

  // ── Retour liste ───────────────────────────────────────────────────────────
  back2(): void {
    this.router.navigate(['admin/eservice/espace-traitement/' + this.prestation]);
  }

  // ── Permissions (conservé pour les cas spécifiques restants) ──────────────
  hasPermission(permission: string): boolean {
    return this.user?.roles?.[0]?.permissions?.some((e: any) => e.name === permission) ?? false;
  }
}