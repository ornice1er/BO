import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


export interface ResponseData {
  hasPermission: number;
  motif?: string;
  reason?: string;
  observation?: string;
  note?: string;
}

@Component({
  selector: 'app-response-display-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-display-component.component.html',
  styleUrl: './response-display-component.component.css'
})
export class ResponseDisplayComponentComponent {
 @Input() responseData: ResponseData | null = null;
  @Output() showNote = new EventEmitter<string>();

  getDecisionText(): string {
    if (!this.responseData) return '';
    
    switch (this.responseData.hasPermission) {
      case 1:
        return 'Favorable';
      case 0:
        return 'Défavorable';
      case 2:
        return 'Mise en attente';
      default:
        return 'Non définie';
    }
  }

  getDecisionClass(): string {
    if (!this.responseData) return '';
    
    switch (this.responseData.hasPermission) {
      case 1:
        return 'status-favorable';
      case 0:
        return 'status-defavorable';
      case 2:
        return 'status-attente';
      default:
        return '';
    }
  }

  onShowNote() {
    if (this.responseData?.note) {
      this.showNote.emit(this.responseData.note);
    }
  }
}
