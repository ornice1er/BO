import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, forwardRef, Inject, PLATFORM_ID, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-quill-wrapper',
  standalone: true,
  template: `
    <ng-container *ngIf="isBrowser">
      <div class="d-flex justify-content-end mb-1">
        <button type="button" class="btn btn-sm btn-outline-secondary"
                (click)="ouvrirSource()">
          <i class="bi bi-code-slash me-1"></i>Code source
        </button>
      </div>
      <quill-editor
        [ngModel]="content"
        [ngModelOptions]="{ standalone: true }"
        [modules]="modules"
        (onContentChanged)="onContentChanged($event)"
        (blur)="onTouched()">
      </quill-editor>
    </ng-container>

    <ng-template #htmlSourceModal let-modal>
      <div class="modal-header">
        <h5 class="modal-title">
          <i class="bi bi-code-slash me-2"></i>Code source HTML
        </h5>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body p-0">
        <textarea class="form-control font-monospace border-0 rounded-0"
                  style="height: 60vh; resize: none; font-size: 12px;"
                  [(ngModel)]="htmlModalBuffer">
        </textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss()">Annuler</button>
        <button type="button" class="btn btn-primary" (click)="appliquerSource(modal)">
          <i class="bi bi-check2 me-1"></i>Appliquer
        </button>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    app-quill-wrapper quill-editor { display: block; width: 100%; }
    app-quill-wrapper .ql-container { min-height: 350px; }
    app-quill-wrapper .ql-editor   { min-height: 350px; font-size: 13px; }
  `],
  imports: [CommonModule, FormsModule, QuillModule, NgbModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorWrapperComponent),
      multi: true
    }
  ]
})
export class QuillEditorWrapperComponent implements ControlValueAccessor {

  isBrowser = false;
  content = '';

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  htmlModalBuffer = '';
  @ViewChild('htmlSourceModal') htmlSourceModalRef!: TemplateRef<any>;

  private onChangeFn:   (value: any) => void = () => {};
  private onTouchedFn: () => void            = () => {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private modalService: NgbModal,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ouvrirSource(): void {
    this.htmlModalBuffer = this.content;
    this.modalService.open(this.htmlSourceModalRef, { size: 'lg', scrollable: true });
  }

  appliquerSource(modal: any): void {
    this.content = this.htmlModalBuffer;
    this.onChangeFn(this.content);
    modal.close();
  }

  onContentChanged(event: ContentChange): void {
    this.content = event.html ?? '';
    this.onChangeFn(this.content);
  }

  onTouched(): void {
    this.onTouchedFn();
  }

  writeValue(value: any): void {
    this.content = value ?? '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
}
