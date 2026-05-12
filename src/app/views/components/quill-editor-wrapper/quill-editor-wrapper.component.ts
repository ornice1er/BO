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
    app-quill-wrapper .ql-toolbar .ql-html { width: 28px; height: 24px; padding: 3px; display: inline-flex; align-items: center; justify-content: center; }
    app-quill-wrapper .ql-toolbar .ql-html svg { width: 16px; height: 16px; }
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
  private static registered = false;

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
    if (!QuillEditorWrapperComponent.registered) {
      const htmlEditButton = (await import('quill-html-edit-button')).default;
      Quill.register('modules/htmlEditButton', htmlEditButton, true);
      QuillEditorWrapperComponent.registered = true;
    }

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
      ],
      htmlEditButton: {
        buttonHTML: '<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><polyline points="5,4 1,9 5,14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13,4 17,9 13,14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><line x1="10" y1="3" x2="8" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
        buttonTitle: 'Voir / éditer le code source HTML',
      },
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