import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

import { DocumentCircuitEtapeService } from '../../../../core/services/document-circuit-etape.service';
import { EtapeDocumentProduitService } from '../../../../core/services/etape-document-produit.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { RoleService } from '../../../../core/services/role.service';
import { PrestationStatusService } from '../../../../core/services/prestation-status.service';
import { WorkflowService } from '../../../../core/services/workflow.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';

@Component({
  selector: 'app-document-circuit-etape',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgToggleModule, NgToggleComponent, HelpPanelComponent],
  templateUrl: './document-circuit-etape.component.html',
  styleUrl: './document-circuit-etape.component.css'
})
export class DocumentCircuitEtapeComponent implements OnInit {

  selected_data: any;
  user: any;
  add_data: any = { is_blocking: true, can_act_pns: false };
  data: any[] = [];
  docProduits: any[] = [];
  uniteAdmins: any[] = [];
  roles: any[] = [];
  prestationStatuses: any[] = [];
  editPrestationStatuses: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

  /** Toutes les transitions workflow (pour vérifier le match condition_type ⇄ action_type) */
  transitions: any[] = [];

  /**
   * Guidage : une action de circuit (`action_type`) ne fait avancer la REQUÊTE
   * que s'il existe une transition workflow de MÊME `condition_type` dans la
   * prestation du document produit. Sinon, l'acte avance mais pas la demande.
   */
  matchCondition(docProduitId: any, actionType: string): any {
    if (!docProduitId || !actionType) return null;

    const dp = this.docProduits.find((d: any) => d.id === docProduitId);
    if (!dp?.prestation_id) return null;

    const matches = this.transitions.filter(
      (t: any) => t.prestation_id === dp.prestation_id && t.condition_type === actionType
    );

    return {
      ok: matches.length > 0,
      count: matches.length,
      action: actionType,
      prestation: dp?.prestation?.name ?? '',
      etapes: matches.map(
        (t: any) => `${t.etape_from?.name ?? '?'} → ${t.etape_to?.name ?? '?'}`
      ),
    };
  }

  actionTypes = [
    { value: 'edition', label: 'Édition' },
    { value: 'paraphe', label: 'Paraphe' },
    { value: 'prevalidation', label: 'Prévalidation' },
    { value: 'signature', label: 'Signature' },
    { value: 'correction', label: 'Correction' },
  ];

  constructor(
    private service: DocumentCircuitEtapeService,
    private docProduitService: EtapeDocumentProduitService,
    private uniteAdminService: UnityAdminService,
    private roleService: RoleService,
    private prestationStatusService: PrestationStatusService,
    private workflowService: WorkflowService,
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
    this.allDocProduits();
    this.allTransitions();
    this.allUniteAdmins();
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

  allDocProduits() {
    this.docProduitService.getAll().subscribe((res: any) => {
      this.docProduits = res.data;
    });
  }

  allTransitions() {
    this.workflowService.getAll().subscribe((res: any) => {
      this.transitions = res.data ?? res ?? [];
    });
  }

  allUniteAdmins() {
    this.uniteAdminService.getAll().subscribe((res: any) => {
      this.uniteAdmins = res.data;
    });
  }

  allRoles() {
    this.roleService.getAll().subscribe((res: any) => {
      this.roles = res.data ?? res;
    });
  }

  onDocProduitChange(docProduitId: number, target: 'add' | 'edit') {
    const docProduit = this.docProduits.find((d: any) => d.id === docProduitId);
    if (!docProduit?.prestation_id) return;
    this.prestationStatusService.getByPrestation(docProduit.prestation_id).subscribe((res: any) => {
      const statuses = res.data ?? res;
      if (target === 'add') {
        this.prestationStatuses = statuses;
      } else {
        this.editPrestationStatuses = statuses;
      }
    });
  }

  checked(el: any) {
    this.selected_data = el;
  }

  add(content: any) {
    this.add_data = { is_blocking: true, can_act_pns: false };
    this.prestationStatuses = [];
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
    this.editPrestationStatuses = [];
    if (this.selected_data.doc_produit_id) {
      this.onDocProduitChange(this.selected_data.doc_produit_id, 'edit');
    }
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
    this.service.store(value).subscribe(
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
    const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Voulez-vous supprimer cet élément ?');
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

  actionTypeLabel(value: string): string {
    return this.actionTypes.find(a => a.value === value)?.label ?? value;
  }

  onSearchChange() {
    const localResults = this.data.filter((d: any) =>
      d.role_name?.includes(this.search_text) ||
      d.doc_produit?.name?.includes(this.search_text)
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
    this.all();
  }
}
