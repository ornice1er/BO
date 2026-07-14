import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { NgToggleModule, NgToggleComponent } from 'ng-toggle-button';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { QuillEditorWrapperComponent } from '../../../components/quill-editor-wrapper/quill-editor-wrapper.component';
import { DocumentTemplateService } from '../../../../core/services/document-template.service';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { HelpPanelComponent } from '../../../components/help-panel/help-panel.component';

@Component({
  selector: 'app-document-template',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NgbModule, LoadingComponent,
    SampleSearchPipe, NgxPaginationModule, NgToggleModule, NgToggleComponent,
    QuillEditorWrapperComponent, HelpPanelComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './document-template.component.html',
})
export class DocumentTemplateComponent implements OnInit {

  data: any[] = [];
  selected_data: any = null;
  add_data: any = { name: '', type: 'agrement', content: '', is_active: true };
  loading  = false;
  loading2 = false;
  search_text = '';
  selectedId: number | null = null;
  pg = { pageSize: 10, p: 1 };

  types = [
    { value: 'agrement',    label: 'Agrément' },
    { value: 'lettre',      label: 'Lettre' },
    { value: 'decision',    label: 'Décision' },
    { value: 'attestation', label: 'Attestation' },
  ];

  constructor(
    private service: DocumentTemplateService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.all();
  }

  all() {
    this.loading2 = true;
    this.service.getAll().subscribe({
      next: (res: any) => { this.data = res.data; this.loading2 = false; this.selectedId = null; },
      error: () => { this.loading2 = false; }
    });
  }

  checked(el: any) { this.selected_data = el; }

  add(content: any) {
    this.add_data = { name: '', type: 'agrement', content: '', is_active: true };
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'xl' });
  }

  edit(content: any) {
    if (!this.selected_data) { this.toastr.warning('Aucun élément sélectionné'); return; }
    (document.activeElement as HTMLElement)?.blur();
    this.modalService.open(content, { size: 'xl' });
  }

  store() {
    this.loading = true;
    this.service.store(this.add_data).subscribe({
      next: () => { this.loading = false; this.modalService.dismissAll(); this.toastr.success('Template créé'); this.all(); },
      error: (err: any) => { this.loading = false; this.toastr.error(err?.error?.message ?? 'Erreur'); }
    });
  }

  update() {
    this.loading = true;
    this.service.update(this.selected_data.id, this.selected_data).subscribe({
      next: () => { this.loading = false; this.modalService.dismissAll(); this.toastr.success('Template mis à jour'); this.all(); },
      error: (err: any) => { this.loading = false; this.toastr.error(err?.error?.message ?? 'Erreur'); }
    });
  }

  async delete() {
    if (!this.selected_data) { this.toastr.warning('Aucun élément sélectionné'); return; }
    const r = await AppSweetAlert.confirmBox('warning', 'Confirmation', 'Supprimer ce template ?');
    if (!r.isConfirmed) return;
    this.loading = true;
    this.service.delete(this.selected_data.id).subscribe({
      next: () => { this.loading = false; this.toastr.success('Template supprimé'); this.all(); },
      error: () => { this.loading = false; }
    });
  }

  getPage(e: any) { this.pg.p = e; }
}
