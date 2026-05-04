import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PlanningSlotService } from '../../../../core/services/planning-slot.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-planning-slot',
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule
  ],
  templateUrl: './planning-slot.component.html',
  styleUrl: './planning-slot.component.css'
})
export class PlanningSlotComponent implements OnInit {

  selected_data: any = null;
  data: any[] = [];
  uniteAdmins: any[] = [];
  prestations: any[] = [];

  loading = false;
  loading2 = false;
  search_text = '';
  selectedId: number | null = null;

  pg = { pageSize: 15, p: 1, total: 0 };

  filterDate = '';
  filterUniteAdmin = '';
  filterSession = '';

  sessionLabels: any = {
    matinee: 'Matinée',
    apres_midi: 'Après-midi',
    journee_entiere: 'Journée entière'
  };

  sessionOptions = [
    { value: 'matinee', label: 'Matinée' },
    { value: 'apres_midi', label: 'Après-midi' },
    { value: 'journee_entiere', label: 'Journée entière' }
  ];

  constructor(
    private slotService: PlanningSlotService,
    private unityAdminService: UnityAdminService,
    private prestationService: PrestationService,
    private locService: LocalStorageService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.all();
    this.loadDropdowns();
  }

  all() {
    this.loading2 = true;
    const params: any = {};
    if (this.filterDate) params['date_start'] = this.filterDate;
    if (this.filterUniteAdmin) params['unite_admin_id'] = this.filterUniteAdmin;
    if (this.filterSession) params['session_type'] = this.filterSession;

    this.slotService.getAll(params).subscribe(
      (res: any) => {
        this.data = res.data?.data ?? res.data ?? [];
        this.pg.total = res.data?.total ?? this.data.length;
        this.selectedId = null;
        this.selected_data = null;
        this.loading2 = false;
      },
      () => { this.loading2 = false; }
    );
  }

  loadDropdowns() {
    this.unityAdminService.getAll().subscribe((res: any) => {
      this.uniteAdmins = res.data ?? [];
    });
    this.prestationService.getAll().subscribe((res: any) => {
      this.prestations = res.data ?? [];
    });
  }

  checked(el: any) {
    this.selected_data = el;
  }

  verifyIfElementChecked(): boolean {
    if (!this.selected_data) {
      this.toastrService.warning('Aucun élément sélectionné');
      return false;
    }
    return true;
  }

  add(content: any) {
    this.selected_data = null;
    this.modalService.open(content, { size: 'lg' });
  }

  show(content: any) {
    if (!this.verifyIfElementChecked()) return;
    this.modalService.open(content, { size: 'md' });
  }

  edit(content: any) {
    if (!this.verifyIfElementChecked()) return;
    this.modalService.open(content, { size: 'lg' });
  }

  store(value: any) {
    this.loading = true;
    this.slotService.store(value).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastrService.success('Créneau créé avec succès');
        this.modalService.dismissAll();
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Créneaux RDV', err.error?.message ?? 'Une erreur est survenue');
      }
    );
  }

  update(value: any) {
    this.loading = true;
    this.slotService.update(this.selected_data.id, value).subscribe(
      (res: any) => {
        this.loading = false;
        this.toastrService.success('Créneau mis à jour avec succès');
        this.modalService.dismissAll();
        this.all();
      },
      (err: any) => {
        this.loading = false;
        AppSweetAlert.simpleAlert('error', 'Créneaux RDV', err.error?.message ?? 'Une erreur est survenue');
      }
    );
  }

  delete() {
    AppSweetAlert.confirmBox('warning', 'Suppression', 'Voulez-vous vraiment supprimer ce créneau ?').then((result: any) => {
      if (result.isConfirmed) {
        this.slotService.delete(this.selected_data.id).subscribe(
          () => {
            this.toastrService.success('Créneau supprimé avec succès');
            this.all();
          },
          (err: any) => AppSweetAlert.simpleAlert('error', 'Créneaux RDV', err.error?.message ?? 'Erreur lors de la suppression')
        );
      }
    });
  }

  toggleAvailability() {
    if (!this.verifyIfElementChecked()) return;
    this.slotService.toggleAvailability(this.selected_data.id).subscribe(
      (res: any) => {
        this.toastrService.success(res.message);
        this.all();
      },
      (err: any) => AppSweetAlert.simpleAlert('error', 'Créneaux RDV', err.error?.message ?? 'Erreur')
    );
  }

  applyFilters() {
    this.pg.p = 1;
    this.all();
  }

  resetFilters() {
    this.filterDate = '';
    this.filterUniteAdmin = '';
    this.filterSession = '';
    this.search_text = '';
    this.pg.p = 1;
    this.all();
  }

  getPage(event: any) {
    this.pg.p = event;
    this.all();
  }

  slotsRemaining(slot: any): number {
    return Math.max(0, (slot.max_slots ?? 0) - (slot.slots_booked ?? 0));
  }
}
