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
  docProduits: any[] = [];
  roles: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

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
    this.modalService.open(content, { size: 'lg' });
  }

  show(content: any) {
    if (!this.verifyIfElementChecked()) return;
    this.modalService.open(content, { size: 'lg' });
  }

  edit(content: any) {
    if (!this.verifyIfElementChecked()) return;
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

  delete() {
    if (confirm('Voulez-vous supprimer cette règle ?')) {
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
    this.all();
  }
}
