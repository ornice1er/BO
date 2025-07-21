import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingComponent2Component } from '../loading-component2/loading-component2.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DecisionData {
  hasPermission: number;
  reason?: string;
  observation?: string;
  motif?: string;
}

@Component({
  selector: 'app-decision-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent2Component],
  templateUrl: './decision-form.component.html',
  styleUrl: './decision-form.component.css'
})
export class DecisionFormComponent {
  @Input() responseData: DecisionData = { hasPermission: -1 };
  @Input() isSigner: boolean = false;
  @Input() loading: boolean = false;
  @Output() formSubmit = new EventEmitter<DecisionData>();
  @Output() decisionChange = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  ngOnInit() {
    // Initialize with default values if needed
    if (!this.responseData) {
      this.responseData = { hasPermission: -1 };
    }
  }

  onDecisionChange(event: any) {
    const value = parseInt(event.target.value);
    this.responseData.hasPermission = value;
    this.decisionChange.emit(value);
    
    // Reset other fields when decision changes
    this.responseData.reason = '';
    this.responseData.observation = '';
    this.responseData.motif = '';
  }

  onSubmit(formValue: any) {
    this.formSubmit.emit(this.responseData);
  }

  onCancel() {
    this.cancel.emit();
  }

  getSubmitButtonText(): string {
    switch (this.responseData.hasPermission) {
      case 1:
        return this.isSigner ? 'Approuver définitivement' : 'Donner un avis favorable';
      case 0:
        return this.isSigner ? 'Rejeter définitivement' : 'Donner un avis défavorable';
      case 2:
        return 'Mettre en attente';
      default:
        return 'Soumettre';
    }
  }
}
