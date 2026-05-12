import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, forwardRef, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ContentChange } from 'ngx-quill';

@Component({
  selector: 'app-quill-wrapper',
  standalone: true,
  template: `
    <ng-container *ngIf="isBrowser && ready">
      <quill-editor
        [ngModel]="content"
        [ngModelOptions]="{ standalone: true }"
        [modules]="modules"
        (onContentChanged)="onContentChanged($event)"
        (blur)="onTouched()">
      </quill-editor>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    app-quill-wrapper quill-editor { display: block; width: 100%; }
    app-quill-wrapper .ql-container { min-height: 350px; }
    app-quill-wrapper .ql-editor   { min-height: 350px; font-size: 13px; }
  `],
  imports: [CommonModule, FormsModule, QuillModule],
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
  ready = false;
  content = '';
  modules: any;

  private onChangeFn: (value: any) => void = () => {};
  private onTouchedFn: () => void = () => {};

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.init();
    }
  }

  async init() {
    const Quill = (await import('quill')).default;
    const htmlEditButton = (await import('quill-html-edit-button')).default;
    Quill.register('modules/htmlEditButton', htmlEditButton);

    this.modules = {
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
        ['htmlEditButton'],
      ],
      htmlEditButton: {},
    };

    this.ready = true;
  }

  // ✅ Utiliser onContentChanged qui retourne { html, text, delta, ... }
  onContentChanged(event: ContentChange): void {
    this.content = event.html ?? '';
    this.onChangeFn(this.content); // 🔥 Notifie le ngForm parent avec du HTML
  }

  onTouched(): void {
    this.onTouchedFn();
  }

  // ControlValueAccessor
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