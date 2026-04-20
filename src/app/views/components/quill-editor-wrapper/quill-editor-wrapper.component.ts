import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, forwardRef, Inject, PLATFORM_ID } from '@angular/core';
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
        (blur)="onTouched()"
        style="min-height:300px">
      </quill-editor>
    </ng-container>
  `,
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
      toolbar: [['bold', 'italic'], ['htmlEditButton']],
      htmlEditButton: {}
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