import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

import { EtapeVisibiliteService } from '../../../../core/services/etape-visibilite.service';
import { EtapeDocumentProduitService } from '../../../../core/services/etape-document-produit.service';
import { RoleService } from '../../../../core/services/role.service';
import { WorkflowService } from '../../../../core/services/workflow.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'app-etape-visibilite',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgToggleModule, NgToggleComponent
  ],
  templateUrl: './etape-visibilite.component.html',
  styleUrl: './etape-visibilite.component.css'
})
export class EtapeVisibiliteComponent implements OnInit {

  selected_data: any;
  user: any;
  add_data: any = { can_read: true, can_act: false, scope_type: 'requete' };
  data: any[] = [];
  transitions: any[] = [];
  prestations: any[] = [];
  docProduits: any[] = [];
  roles: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

  viewMode: 'table' | 'diagram' = 'table';
  selectedPrestationId: number | null = null;

  // ── Suppression / Copie par prestation ─────────────────────────────────────
  copyFromPrestationId: number | null = null;
  copyToPrestationId:   number | null = null;
  loadingCopy = false;

  constructor(
    private service: EtapeVisibiliteService,
    private workflowService: WorkflowService,
    private docProduitService: EtapeDocumentProduitService,
    private roleService: RoleService,
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
    this.allTransitions();
    this.allDocProduits();
    this.allRoles();
    this.user = this.locService.get(GlobalName.userName);
    this.permissions = this.user.roles[0].permissions;
  }

  all() {
    this.loading2 = true;
    this.service.getAll().subscribe(
      (res: any) => {
        this.data = res.data;
        this.loading2 = false;
        this.selectedId = null;
      },
      () => { this.loading2 = false; }
    );
  }

  allTransitions() {
    this.workflowService.getAll().subscribe((res: any) => {
      this.transitions = res.data ?? res;
      // Extraire les prestations uniques depuis les transitions
      const map = new Map<number, any>();
      this.transitions.forEach((t: any) => {
        const p = t.prestation;
        if (p && !map.has(p.id)) map.set(p.id, p);
      });
      this.prestations = Array.from(map.values())
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  allDocProduits() {
    this.docProduitService.getAll().subscribe((res: any) => {
      this.docProduits = res.data;
    });
  }

  allRoles() {
    this.roleService.getAll().subscribe((res: any) => {
      this.roles = res.data ?? res;
    });
  }

  // ── Filtrage ────────────────────────────────────────────────

  get filteredData(): any[] {
    if (!this.selectedPrestationId) return this.data;
    return this.data.filter(d =>
      (d.transition?.prestation?.id ?? null) === this.selectedPrestationId
    );
  }

  filterByPrestation(id: number | null) {
    this.selectedPrestationId = id;
    this.pg.p = 1;
    if (!id) this.viewMode = 'table';
  }

  prestationName(id: number | null): string {
    return this.prestations.find(p => p.id === id)?.name ?? '';
  }

  // ── Diagramme ───────────────────────────────────────────────

  get diagramGroups(): { transition: any; rules: any[] }[] {
    if (!this.selectedPrestationId) return [];
    const transForPrestation = this.transitions
      .filter((t: any) => (t.prestation?.id ?? t.prestation_id) === this.selectedPrestationId)
      .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
    return transForPrestation.map((t: any) => ({
      transition: t,
      rules: this.data.filter(d => d.workflow_transition_id === t.id),
    }));
  }

  // ── Helpers ─────────────────────────────────────────────────

  transitionLabel(t: any): string {
    if (!t) return '—';
    const from = t.etape_from?.name ?? '?';
    const to   = t.etape_to?.name  ?? 'Terminal';
    return `${t.prestation?.code ?? ''} — ${from} → ${to} [${t.condition_type}]`;
  }

  resolveTransition(d: any): any {
    const id = d?.workflow_transition_id ?? d?.transition?.id;
    return this.transitions.find(t => t.id === id) ?? d?.transition;
  }

  checked(el: any) {
    this.selected_data = el;
  }

  add(content: any) {
    this.add_data = { can_read: true, can_act: false, scope_type: 'requete' };
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
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  verifyIfElementChecked() {
    if (this.selected_data == null) {
      this.toastrService.warning('Aucun élément sélectionné');
      return false;
    }
    return true;
  }

  store(value: any) {
    this.loading = true;
    const payload = {
      ...value,
      can_read: this.add_data.can_read,
      can_act:  this.add_data.can_act,
    };
    this.service.store(payload).subscribe(
      () => {
        this.loading = false;
        this.modalService.dismissAll();
        this.all();
      },
      () => { this.loading = false; }
    );
  }

  update(value: any) {
    this.loading = true;
    this.service.update(value, this.selected_data.id).subscribe(
      () => {
        this.loading = false;
        this.modalService.dismissAll();
        this.all();
      },
      () => { this.loading = false; }
    );
  }

  async delete() {
    const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Voulez-vous supprimer cette règle ?');
    if (result.isConfirmed) {
      this.loading = true;
      this.service.delete(this.selected_data.id).subscribe(
        () => {
          this.loading = false;
          this.all();
        },
        () => { this.loading = false; }
      );
    }
  }

  async deleteAllForPrestation(): Promise<void> {
    if (!this.selectedPrestationId) return;
    const name  = this.prestationName(this.selectedPrestationId);
    const count = this.filteredData.length;
    const msg   = `Supprimer les ${count} règle(s) de « ${name} » ?\n\nCette action est irréversible.`;
    const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', msg);
    if (!result.isConfirmed) return;

    this.loading = true;
    this.service.deleteByPrestation(this.selectedPrestationId).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message ?? 'Règles supprimées');
        this.loading = false;
        this.all();
      },
      error: () => { this.loading = false; }
    });
  }

  openCopyModal(modal: any): void {
    this.copyFromPrestationId = null;
    this.copyToPrestationId   = this.selectedPrestationId;
    this.modalService.open(modal, { size: 'md' });
  }

  copyVisibilites(): void {
    if (!this.copyFromPrestationId || !this.copyToPrestationId) {
      this.toastrService.warning('Sélectionnez les deux prestations');
      return;
    }
    if (this.copyFromPrestationId === this.copyToPrestationId) {
      this.toastrService.warning('Source et destination doivent être différentes');
      return;
    }
    this.loadingCopy = true;
    this.service.copyFromPrestation(this.copyFromPrestationId, this.copyToPrestationId).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message ?? 'Règles copiées avec succès');
        this.loadingCopy = false;
        this.modalService.dismissAll();
        this.all();
      },
      error: () => { this.loadingCopy = false; }
    });
  }

  onSearchChange() {
    const localResults = this.data.filter((d: any) =>
      d.role_name?.includes(this.search_text)
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
        this.data = result.data;
        this.pg.p = 1;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  resetSearch() {
    this.search_text = '';
    this.isPaginate = true;
    this.pg.p = 1;
    this.all();
  }

  getPage(event: any) {
    this.pg.p = event;
  }
}
