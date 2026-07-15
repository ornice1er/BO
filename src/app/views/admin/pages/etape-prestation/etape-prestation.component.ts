import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';
import { forkJoin } from 'rxjs';

import { EtapePrestationService } from '../../../../core/services/etape-prestation.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { EtapeService } from '../../../../core/services/etape.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';

/**
 * Contextualisation des étapes par prestation.
 *
 * Les étapes sont globales et partagées entre e-services : leurs champs
 * comportementaux (SLA, unité responsable, RDV, association à une session) ne
 * peuvent pas être identiques partout. Cet écran permet de les surcharger
 * e-service par e-service, sur le même patron que « Statuts par prestation ».
 */
@Component({
  selector: 'app-etape-prestation',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgToggleModule, NgToggleComponent
  ],
  templateUrl: './etape-prestation.component.html',
  styleUrl: './etape-prestation.component.css'
})
export class EtapePrestationComponent implements OnInit {

  selected_data: any;
  user: any;
  add_data: any = { can_associate: false, need_meeting: false };
  data: any[] = [];
  prestations: any[] = [];
  etapes: any[] = [];
  unites: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

  selectedPrestationId: any = null;

  /** Copie de la configuration d'une prestation vers une (ou plusieurs) autre(s) */
  copySourcePrestationId: any = null;
  copyTargetPrestationIds: any[] = [];

  constructor(
    private service: EtapePrestationService,
    private prestationService: PrestationService,
    private etapeService: EtapeService,
    private unityAdminService: UnityAdminService,
    private locService: LocalStorageService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.all();
    this.allPrestations();
    this.allEtapes();
    this.allUnites();
    this.user = this.locService.get(GlobalName.userName);
    this.permissions = this.user?.roles?.[0]?.permissions ?? [];
  }

  // ── Données ────────────────────────────────────────────────────────────────

  all() {
    this.loading2 = true;
    this.service.getAll().subscribe(
      (res: any) => {
        this.data = res.data ?? res ?? [];
        this.loading2 = false;
        this.selectedId = null;
      },
      () => { this.loading2 = false; }
    );
  }

  allPrestations() {
    this.prestationService.getAll().subscribe((res: any) => {
      this.prestations = res.data ?? res ?? [];
    });
  }

  allEtapes() {
    this.etapeService.getAll().subscribe((res: any) => {
      this.etapes = res.data ?? res ?? [];
    });
  }

  allUnites() {
    this.unityAdminService.getAll().subscribe((res: any) => {
      this.unites = res.data ?? res ?? [];
    });
  }

  // ── Filtrage / affichage ─────────────────────────────────────────────────

  /** Données affichées, filtrées par prestation. */
  get displayedData(): any[] {
    if (!this.selectedPrestationId) return this.data;
    return this.data.filter(
      (d: any) => (d?.prestation_id ?? d?.prestation?.id) === this.selectedPrestationId
    );
  }

  onPrestationFilterChange() {
    this.selectedId = null;
    this.pg.p = 1;
  }

  uniteNom(id: number | null): string {
    if (!id) return '—';
    const u = this.unites.find((x: any) => x.id === id);
    return u ? u.libelle : '—';
  }

  // ── Copie ────────────────────────────────────────────────────────────────

  /** Lignes configurées sur la prestation source (aperçu). */
  get copySourceRows(): any[] {
    if (!this.copySourcePrestationId) return [];
    return this.data.filter(
      (d: any) => (d?.prestation_id ?? d?.prestation?.id) === this.copySourcePrestationId
    );
  }

  /** Prestations sélectionnables comme cible (on exclut la source). */
  get copyTargetPrestations(): any[] {
    return this.prestations.filter((p: any) => p?.id !== this.copySourcePrestationId);
  }

  // ── Sélection / modales ──────────────────────────────────────────────────

  checked(el: any) {
    this.selected_data = el;
  }

  add(content: any) {
    this.add_data = { can_associate: false, need_meeting: false };
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  copy(content: any) {
    this.copySourcePrestationId = null;
    this.copyTargetPrestationIds = [];
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  show(content: any) {
    if (!this.verifyIfElementChecked()) return;
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  edit(content: any) {
    if (!this.verifyIfElementChecked()) return;
    // Copie défensive : édition sans muter la ligne du tableau avant sauvegarde.
    this.selected_data = { ...this.selected_data };
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  verifyIfElementChecked(): boolean {
    if (this.selected_data == null) {
      this.toastrService.warning('Aucun élément sélectionné');
      return false;
    }
    return true;
  }

  // ── CRUD ─────────────────────────────────────────────────────────────────

  store(value: any) {
    if (!value.prestation_id || !value.etape_id) {
      this.toastrService.warning('La prestation et l\'étape sont requises');
      return;
    }
    this.loading = true;
    this.service.store(value).subscribe(
      () => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toastrService.success('Étape configurée pour cette prestation');
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppErrorShow.showError('Enregistrement échoué', err);
      }
    );
  }

  update(value: any) {
    this.loading = true;
    this.service.update(value, this.selected_data.id).subscribe(
      () => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toastrService.success('Configuration mise à jour');
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppErrorShow.showError('Mise à jour échouée', err);
      }
    );
  }

  async delete() {
    if (!this.verifyIfElementChecked()) return;
    const result = await AppSweetAlert.confirmBox(
      'warning', 'Confirmation',
      'Supprimer cette configuration ? L\'étape reprendra ses valeurs par défaut.'
    );
    if (!result.isConfirmed) return;

    this.loading = true;
    this.service.delete(this.selected_data.id).subscribe(
      () => {
        this.loading = false;
        this.toastrService.success('Configuration supprimée');
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppErrorShow.showError('Suppression échouée', err);
      }
    );
  }

  copyConfigs() {
    if (!this.copySourcePrestationId) {
      this.toastrService.warning('Veuillez sélectionner la prestation source');
      return;
    }
    if (!this.copyTargetPrestationIds || this.copyTargetPrestationIds.length === 0) {
      this.toastrService.warning('Veuillez sélectionner au moins une prestation cible');
      return;
    }
    if (this.copySourceRows.length === 0) {
      this.toastrService.warning('La prestation source ne possède aucune étape configurée');
      return;
    }

    this.loading = true;
    this.service.copyFromPrestation(this.copySourcePrestationId, this.copyTargetPrestationIds).subscribe(
      (res: any) => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toastrService.success(res?.message ?? 'Configuration copiée avec succès');
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppErrorShow.showError('Copie échouée', err);
      }
    );
  }

  // ── Recherche / pagination ───────────────────────────────────────────────

  onSearchChange() {
    const localResults = this.data.filter((d: any) =>
      d?.etape?.name?.includes(this.search_text) ||
      d?.prestation?.name?.includes(this.search_text)
    );
    if (this.search_text.length > 2 && localResults.length === 0) {
      this.searchRemotely();
    }
  }

  searchRemotely() {
    if (!this.search_text || this.search_text.trim().length < 2) return;
    this.loading = true;
    this.service.search({ search: this.search_text }).subscribe({
      next: (result: any) => {
        this.data = result.data ?? [];
        this.pg.p = 1;
        this.pg.total = this.data.length;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  resetSearch() {
    this.search_text = '';
    this.selectedPrestationId = null;
    this.isPaginate = true;
    this.pg.p = 1;
    this.all();
  }

  getPage(event: any) {
    this.pg.p = event;
  }
}
