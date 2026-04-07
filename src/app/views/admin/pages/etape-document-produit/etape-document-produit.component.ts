import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';

import { EtapeDocumentProduitService } from '../../../../core/services/etape-document-produit.service';
import { EtapeService } from '../../../../core/services/etape.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-etape-document-produit',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule,
    MatTooltipModule, NgToggleModule, NgToggleComponent
  ],
  templateUrl: './etape-document-produit.component.html',
  styleUrl: './etape-document-produit.component.css'
})
export class EtapeDocumentProduitComponent implements OnInit {

  selected_data: any;
  user: any;
  add_data: any = { allow_correction: true };
  data: any[] = [];
  etapes: any[] = [];
  prestations: any[] = [];
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  selectedFilter = '';
  remoteSearchData: any[] = [];
  isPaginate = true;
  pg = { pageSize: 10, p: 1, total: 0 };

  constructor(
    private service: EtapeDocumentProduitService,
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
    this.add_data = { allow_correction: true };
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
    this.service.store(value).subscribe(
      (res: any) => {
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
      (res: any) => {
        this.loading = false;
        this.modalService.dismissAll();
        this.all();
      },
      () => { this.loading = false; }
    );
  }

  delete() {
    if (confirm('Voulez-vous supprimer cet élément ?')) {
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
      d.name?.includes(this.search_text) || d.template_key?.includes(this.search_text)
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
