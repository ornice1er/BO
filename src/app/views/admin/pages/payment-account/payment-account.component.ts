import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';
import { PaymentAccountService } from '../../../../core/services/payment-account.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';

@Component({
  selector: 'app-payment-account',
  templateUrl: './payment-account.component.html',
  imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgxPaginationModule, MatTooltipModule, HelpPanelComponent],
})
export class PaymentAccountComponent implements OnInit {
  data: any[] = [];
  selected_data: any = null;
  selectedId: number | null = null;
  loading = false;
  search_text = '';

  add_data: any = { type: 'bjpay', env: 'test' };
  edit_data: any = {};

  aggregators = [
    { value: 'bjpay',   label: 'BJ PAY',   logo: 'bi-credit-card-2-front' },
    { value: 'fedapay', label: 'FEDAPAY',   logo: 'bi-wallet2' },
    { value: 'kkiapay', label: 'KKIAPAY',   logo: 'bi-phone' },
  ];

  pg = { pageSize: 10, p: 1, total: 0 };

  constructor(
    private service: PaymentAccountService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    private modal: NgbModal,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() { this.getAll(); }

  getAll() {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (res: any) => { this.data = res.data; this.pg.total = this.data.length; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  checked(el: any) {
    this.selected_data = el;
  }

  add(tpl: any) {
    this.add_data = { type: 'bjpay', env: 'test' };
    (document.activeElement as HTMLElement)?.blur();
    this.modal.open(tpl, { size: 'lg' });
  }

  edit(tpl: any) {
    if (!this.verifyChecked()) return;
    this.edit_data = { ...this.selected_data };
    (document.activeElement as HTMLElement)?.blur();
    this.modal.open(tpl, { size: 'lg' });
  }

  store(value: any) {
    this.loading = true;
    this.service.store(value).subscribe({
      next: (res: any) => { this.loading = false; this.modal.dismissAll(); this.getAll(); this.toastr.success(res.message || 'Compte créé'); },
      error: (err: any) => { this.loading = false; AppErrorShow.showError('Erreur', err); },
    });
  }

  update(value: any) {
    this.loading = true;
    this.service.update(this.selected_data.id, value).subscribe({
      next: (res: any) => { this.loading = false; this.modal.dismissAll(); this.getAll(); this.toastr.success(res.message || 'Compte mis à jour'); },
      error: (err: any) => { this.loading = false; AppErrorShow.showError('Erreur', err); },
    });
  }

  async delete() {
    if (!this.verifyChecked()) return;
    const r = await AppSweetAlert.confirmBox('warning', 'Suppression', 'Supprimer ce compte de recette ?');
    if (!r.isConfirmed) return;
    this.loading = true;
    this.service.delete(this.selected_data.id).subscribe({
      next: () => { this.loading = false; this.getAll(); this.toastr.success('Supprimé'); },
      error: (err: any) => { this.loading = false; AppErrorShow.showError('Erreur', err); },
    });
  }

  setStatus(val: 0|1) {
    if (!this.verifyChecked()) return;
    this.loading = true;
    this.service.setStatus(this.selected_data.id, val).subscribe({
      next: (res: any) => { this.loading = false; this.getAll(); this.toastr.success(res.message); },
      error: (err: any) => { this.loading = false; AppErrorShow.showError('Erreur', err); },
    });
  }

  verifyChecked() {
    if (!this.selected_data) { this.toastr.warning('Aucun élément sélectionné'); return false; }
    return true;
  }

  aggregatorLabel(type: string) {
    return this.aggregators.find(a => a.value === type)?.label ?? type;
  }
  aggregatorIcon(type: string) {
    return this.aggregators.find(a => a.value === type)?.logo ?? 'bi-bank';
  }
}
