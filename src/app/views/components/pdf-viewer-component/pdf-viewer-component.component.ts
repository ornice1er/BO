import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer-component.component.html',
  styleUrl: './pdf-viewer-component.component.css'
})
export class PdfViewerComponentComponent {
  @Input() pdfSrc: string | null = null;
  @Output() backClicked = new EventEmitter<void>();

  onBack() {
    this.backClicked.emit();
  }
}
