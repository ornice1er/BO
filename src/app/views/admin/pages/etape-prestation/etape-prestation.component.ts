import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

import { EtapePrestationService } from '../../../../core/services/etape-prestation.service';
import { WorkflowService } from '../../../../core/services/workflow.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

/**
 * Contextualisation des étapes par prestation.
 *
 * Les étapes sont globales et partagées entre e-services : leurs champs
 * comportementaux (SLA, unité responsable, RDV, association à une session) ne
 * peuvent pas être identiques partout. Cet écran permet de les surcharger
 * e-service par e-service ; une valeur non renseignée est héritée de l'étape.
 */
@Component({
  selector: 'app-etape-prestation',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    NgSelectModule, MatTooltipModule, NgToggleModule, NgToggleComponent
  ],
  templateUrl: './etape-prestation.component.html',
  styleUrl: './etape-prestation.component.css'
})
export class EtapePrestationComponent implements OnInit {

  prestations: any[] = [];
  unites: any[] = [];
  etapes: any[] = [];

  selectedPrestationId: number | null = null;
  selected_data: any = null;

  loading = false;
  loading2 = false;

  constructor(
    private service: EtapePrestationService,
    private workflowService: WorkflowService,
    private unityAdminService: UnityAdminService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.allPrestations();
    this.allUnites();
  }

  /** Les prestations proposées sont celles qui ont un graphe de transitions. */
  allPrestations(): void {
    this.workflowService.getAll().subscribe((res: any) => {
      const transitions = res.data ?? res;
      const map = new Map<number, any>();
      transitions.forEach((t: any) => {
        if (t?.prestation && !map.has(t.prestation.id)) map.set(t.prestation.id, t.prestation);
      });
      this.prestations = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  allUnites(): void {
    this.unityAdminService.getAll().subscribe((res: any) => {
      this.unites = res.data ?? res;
    });
  }

  chargerEtapes(): void {
    if (!this.selectedPrestationId) {
      this.etapes = [];
      return;
    }
    this.loading2 = true;
    this.service.graphe(this.selectedPrestationId).subscribe({
      next: (res: any) => {
        this.etapes = res.data ?? [];
        this.loading2 = false;
      },
      error: () => { this.loading2 = false; }
    });
  }

  /** Une étape est « contextualisée » si elle porte une ligne de surcharge. */
  estContextualisee(etape: any): boolean {
    return !!etape?.contextualisation?.id;
  }

  /** Étapes de ce parcours qui servent aussi à d'autres e-services. */
  get nbPartagees(): number {
    return this.etapes.filter((e: any) => (e?.nb_eservices ?? 1) > 1).length;
  }

  uniteNom(id: number | null): string {
    if (!id) return '—';
    const u = this.unites.find((x: any) => x.id === id);
    return u ? u.libelle : '—';
  }

  // ── Configuration ──────────────────────────────────────────────────────────

  ouvrirConfig(content: any, etape: any): void {
    const ctx = etape.contextualisation;

    this.selected_data = {
      id:             ctx?.id ?? null,
      prestation_id:  this.selectedPrestationId,
      etape_id:       etape.id,
      etape_name:     etape.name,
      // On préremplit avec les valeurs EFFECTIVES : l'administrateur voit ce qui
      // s'applique aujourd'hui, et non un formulaire vide trompeur.
      sla_days:       etape.effectif?.sla_days       ?? null,
      unite_admin_id: etape.effectif?.unite_admin_id ?? null,
      can_associate:  !!etape.effectif?.can_associate,
      need_meeting:   !!etape.effectif?.need_meeting,
    };

    this.modalService.open(content, { size: 'lg' });
  }

  enregistrer(form: any): void {
    if (!this.selected_data) return;
    this.loading = true;

    const payload = {
      prestation_id:  this.selected_data.prestation_id,
      etape_id:       this.selected_data.etape_id,
      sla_days:       this.selected_data.sla_days,
      unite_admin_id: this.selected_data.unite_admin_id,
      can_associate:  this.selected_data.can_associate,
      need_meeting:   this.selected_data.need_meeting,
    };

    const requete$ = this.selected_data.id
      ? this.service.update(payload, this.selected_data.id)
      : this.service.store(payload);

    requete$.subscribe({
      next: () => {
        this.loading = false;
        this.toastrService.success('Étape configurée pour cette prestation');
        this.modalService.dismissAll();
        this.chargerEtapes();
      },
      error: (err: any) => {
        this.loading = false;
        this.toastrService.error(err?.error?.message ?? 'Enregistrement impossible');
      }
    });
  }

  /** Supprime la surcharge : l'étape reprend ses valeurs par défaut. */
  reinitialiser(etape: any): void {
    const id = etape?.contextualisation?.id;
    if (!id) return;

    AppSweetAlert.confirmBox(
      'warning',
      'Réinitialiser cette étape ?',
      `« ${etape.name} » reprendra les valeurs par défaut de l'étape pour cette prestation.`
    ).then((res: any) => {
      if (!res.isConfirmed) return;

      this.service.delete(id).subscribe({
        next: () => {
          this.toastrService.success('Configuration supprimée');
          this.chargerEtapes();
        },
        error: (err: any) => {
          this.toastrService.error(err?.error?.message ?? 'Suppression impossible');
        }
      });
    });
  }
}
