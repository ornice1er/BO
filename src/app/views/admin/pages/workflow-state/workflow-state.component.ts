import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { WorkflowStateService } from '../../../../core/services/workflow-state.service';
import {
  WorkflowState,
  WorkflowTransition,
  RequeteEtapeLog,
  MotifRejet,
  TransitionCondition,
} from '../../../../core/Models/interface.model';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-workflow-state',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, LoadingComponent],
  templateUrl: './workflow-state.component.html',
  styleUrl: './workflow-state.component.css',
})
export class WorkflowStateComponent implements OnInit {

  requeteId!: number;
  slug = '';

  state: WorkflowState | null = null;
  logs: RequeteEtapeLog[] = [];

  loadingState  = false;
  loadingLogs   = false;
  applyingTransition = false;

  // Transition sélectionnée pour confirmation
  selectedTransition: WorkflowTransition | null = null;
  transitionComment  = '';
  selectedMotifId: number | null = null;

  // Filtre motifs selon le condition_type sélectionné
  get motifsForSelectedTransition(): MotifRejet[] {
    if (!this.state || !this.selectedTransition) return [];
    return this.state.motifs_rejet;
  }

  get needsMotif(): boolean {
    return this.selectedTransition?.condition_type === 'rejet'
        || this.selectedTransition?.condition_type === 'cloture';
  }

  constructor(
    private route: ActivatedRoute,
    private workflowStateService: WorkflowStateService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.requeteId = +this.route.snapshot.paramMap.get('id')!;
    this.slug      =  this.route.snapshot.paramMap.get('slug') ?? '';
    this.loadState();
    this.loadLogs();
  }

  // ── Chargement ─────────────────────────────────────────────────────────────

  loadState(): void {
    this.loadingState = true;
    this.workflowStateService.getWorkflowState(this.requeteId).subscribe({
      next: (res: any) => {
        this.state = res.data;
        this.loadingState = false;
      },
      error: () => {
        this.toastr.error('Impossible de charger l\'état du workflow.');
        this.loadingState = false;
      },
    });
  }

  loadLogs(): void {
    this.loadingLogs = true;
    this.workflowStateService.getEtapeLogs(this.requeteId).subscribe({
      next: (res: any) => {
        this.logs = res.data;
        this.loadingLogs = false;
      },
      error: () => { this.loadingLogs = false; },
    });
  }

  // ── Actions transitions ────────────────────────────────────────────────────

  openConfirmModal(transition: WorkflowTransition, content: any): void {
    this.selectedTransition = transition;
    this.transitionComment  = '';
    this.selectedMotifId    = null;
    this.modalService.open(content, { size: 'md' });
  }

  confirmTransition(): void {
    if (!this.selectedTransition) return;

    if (this.needsMotif && !this.selectedMotifId) {
      this.toastr.warning('Veuillez sélectionner un motif de rejet.');
      return;
    }

    this.applyingTransition = true;

    const payload: any = { transition_id: this.selectedTransition.id };
    if (this.transitionComment)  payload['comment']        = this.transitionComment;
    if (this.selectedMotifId)    payload['motif_rejet_id'] = this.selectedMotifId;

    this.workflowStateService.applyTransition(this.requeteId, payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message ?? 'Transition appliquée avec succès.');
        this.modalService.dismissAll();
        this.applyingTransition = false;
        this.selectedTransition = null;
        this.loadState();
        this.loadLogs();
      },
      error: (err: any) => {
        this.toastr.error(err?.error?.message ?? 'Erreur lors de l\'application de la transition.');
        this.applyingTransition = false;
      },
    });
  }

  // ── Helpers affichage ──────────────────────────────────────────────────────

  /** Classe CSS Bootstrap du bouton selon le type de condition */
  getBtnClass(condition: TransitionCondition): string {
    const map: Record<TransitionCondition, string> = {
      auto:          'btn-secondary',
      validation:    'btn-success',
      rejet:         'btn-danger',
      complement:    'btn-warning',
      signature:     'btn-primary',
      cloture:       'btn-dark',
      paraphe:       'btn-info',
      prevalidation: 'btn-secondary',
      choix_sortie:  'btn-primary',
    };
    return map[condition] ?? 'btn-secondary';
  }

  /** Icône Bootstrap Icons par condition */
  getIcon(condition: TransitionCondition): string {
    const map: Record<TransitionCondition, string> = {
      auto:          'bi-arrow-right-circle',
      validation:    'bi-check-circle',
      rejet:         'bi-x-circle',
      complement:    'bi-arrow-clockwise',
      signature:     'bi-pen',
      cloture:       'bi-lock',
      paraphe:       'bi-pencil-square',
      prevalidation: 'bi-shield-check',
      choix_sortie:  'bi-list-check',
    };
    return map[condition] ?? 'bi-arrow-right';
  }

  /** Libellé lisible du type de condition */
  getConditionLabel(condition: TransitionCondition): string {
    const map: Record<TransitionCondition, string> = {
      auto:          'Automatique',
      validation:    'Valider',
      rejet:         'Rejeter',
      complement:    'Complément reçu',
      signature:     'Signer',
      cloture:       'Clôturer',
      paraphe:       'Parapher',
      prevalidation: 'Pré-valider',
      choix_sortie:  'Choisir la sortie',
    };
    return map[condition] ?? condition;
  }

  /** Badge couleur pour le type d'étape */
  getEtapeTypeBadge(type: string): string {
    const map: Record<string, string> = {
      depot:       'bg-info text-dark',
      traitement:  'bg-warning text-dark',
      commission:  'bg-primary',
      delivrance:  'bg-success',
    };
    return map[type] ?? 'bg-secondary';
  }

  /** Badge SLA */
  getSlaClass(daysLeft: number): string {
    if (daysLeft < 0)  return 'badge bg-danger';
    if (daysLeft <= 2) return 'badge bg-warning text-dark';
    return 'badge bg-success';
  }
}
