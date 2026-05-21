import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { DistrictService } from '../../../../core/services/district.service';
import { VillageService } from '../../../../core/services/village.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule, HelpPanelComponent],
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {
  selected_data: any;
  data: any[] = [];
  districts: any[] = [];
  user: any;
  permissions: any[] = [];
  loading = false;
  loading2 = false;
  search_text: any = '';
  selectedId: number | null = null;
  pg = { pageSize: 10, p: 1, total: 0 };

  constructor(
    private villageService: VillageService,
    private districtService: DistrictService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private locService: LocalStorageService,
    private toastrService: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.all();
    this.loadDistricts();
    this.user = this.locService.get(GlobalName.userName);
    this.permissions = this.user.roles[0].permissions;
  }

  all() {
    this.loading2 = true;
    this.villageService.getAll().subscribe(
      (res: any) => { this.data = res.data; this.loading2 = false; },
      () => { this.loading2 = false; }
    );
  }

  loadDistricts() {
    this.districtService.getAll().subscribe((res: any) => { this.districts = res.data; });
  }

  checked(el: any) { this.selected_data = el; }

  add(content: any) { (document.activeElement as HTMLElement)?.blur();
 this.modalService.open(content, { size: 'lg' }); }

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
      this.toastrService.warning('Aucun élément selectionné');
      return false;
    }
    return true;
  }

  store(value: any) {
    this.loading = true;
    this.villageService.store(value).subscribe(
      () => { this.loading = false; this.modalService.dismissAll(); this.all(); },
      () => { this.loading = false; }
    );
  }

  update(value: any) {
    this.loading = true;
    this.villageService.update(value, this.selected_data.id).subscribe(
      () => { this.loading = false; this.modalService.dismissAll(); this.all(); },
      () => { this.loading = false; }
    );
  }

  async delete() {
    const result = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Voulez vous supprimer cet élément');
    if (result.isConfirmed) {
      this.loading = true;
      this.villageService.delete(this.selected_data.id).subscribe(
        () => { this.loading = false; this.all(); },
        () => { this.loading = false; }
      );
    }
  }

  setStatus(value: any) {
    this.toastrService.warning('Opération en cours');
    this.loading = true;
    this.villageService.setStatus(this.selected_data.id, value).subscribe(
      (res: any) => { this.toastrService.success(res.message); this.loading = false; this.all(); },
      (err: any) => { this.loading = false; AppSweetAlert.simpleAlert('error', 'Villages', err.error.message); }
    );
  }

  onSearchChange() {
    const local = this.data.filter((d: any) => d.name?.includes(this.search_text));
    if (this.search_text.length > 2 && local.length === 0) {
      this.villageService.search({ search: this.search_text }).subscribe({
        next: (res: any) => { this.data = res.data; this.pg.p = 1; },
        error: () => {}
      });
    }
  }

  resetSearch() { this.search_text = ''; this.pg.p = 1; this.all(); }

  getPage(event: any) { this.pg.p = event; }

  hasPermission(permission: any) {
    return !!this.permissions.find((e: any) => e.name === permission);
  }
}
