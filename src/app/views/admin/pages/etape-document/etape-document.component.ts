import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

import { EtapeDocumentService } from '../../../../core/services/etape-document.service';
import { EtapeService } from '../../../../core/services/etape.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';

@Component({
  selector: 'app-etape-document',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgToggleModule, NgToggleComponent, HelpPanelComponent],
  templateUrl: './etape-document.component.html',
  styleUrl: './etape-document.component.css'
})
export class EtapeDocumentComponent implements OnInit {

  selected_data: any;
  user: any;
  add_data: any = { is_required: true, accepted_mime_types: [] };
  data: any[] = [];
  etapes: any[] = [];
  prestations: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

  mimeOptions = [
    { value: 'application/pdf', label: 'PDF' },
    { value: 'image/jpeg', label: 'JPEG' },
    { value: 'image/png', label: 'PNG' },
    { value: 'image/gif', label: 'GIF' },
    { value: 'application/msword', label: 'Word (.doc)' },
    { value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', label: 'Word (.docx)' },
    { value: 'application/vnd.ms-excel', label: 'Excel (.xls)' },
    { value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', label: 'Excel (.xlsx)' },
  ];

  constructor(
    private service: EtapeDocumentService,
    private etapeService: EtapeService,
    private prestationService: PrestationService,
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
    this.allEtapes();
    this.allPrestations();
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

  allEtapes() {
    this.etapeService.getAll().subscribe((res: any) => {
      this.etapes = res.data;
    });
  }

  allPrestations() {
    this.prestationService.getAll().subscribe((res: any) => {
      this.prestations = res.data;
    });
  }

  checked(el: any) {
    this.selected_data = el;
  }

  add(content: any) {
    this.add_data = { is_required: true, accepted_mime_types: [], slug: '' };
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'lg' });
  }

  onNameChange(name: string) {
    this.add_data.slug = name
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s_]/g, '')
      .trim()
      .replace(/\s+/g, '_');
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
    const payload = { ...value, accepted_mime_types: this.add_data.accepted_mime_types ?? [] };
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

  mimeLabel(value: string): string {
    return this.mimeOptions.find(m => m.value === value)?.label ?? value;
  }

  onSearchChange() {
    const localResults = this.data.filter((d: any) =>
      d.name?.includes(this.search_text) || d.slug?.includes(this.search_text)
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
