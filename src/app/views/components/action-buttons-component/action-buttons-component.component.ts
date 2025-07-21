import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingComponent2Component } from '../loading-component2/loading-component2.component';


export interface ActionButtonsConfig {
  isTreated: boolean;
  isSigner: boolean;
  loading: boolean;
  hasValidationPermission: boolean;
  hasAuthorizationPermission: boolean;
  needValidation: boolean;
  isAuthorized: boolean;
  status: number;
}

@Component({
  selector: 'app-action-buttons-component',
  standalone: true,
  imports: [CommonModule, LoadingComponent2Component],
  templateUrl: './action-buttons-component.component.html',
  styleUrl: './action-buttons-component.component.css'
})
export class ActionButtonsComponentComponent {
 @Input() config!: ActionButtonsConfig;
  @Output() submitAdvice = new EventEmitter<void>();
  @Output() validate = new EventEmitter<void>();
  @Output() deliver = new EventEmitter<void>();
  @Output() openDialog = new EventEmitter<void>();

  showValidationButton(): boolean {
    return this.config.isTreated && 
           this.config.needValidation && 
           this.config.hasValidationPermission && 
           this.config.status !== 5;
  }

  showSignButton(): boolean {
    return this.config.hasAuthorizationPermission && 
           !this.config.isAuthorized && 
           this.config.isTreated && 
           !this.config.needValidation;
  }

  showDeliverButton(): boolean {
    return this.config.hasAuthorizationPermission && 
           this.config.isAuthorized && 
           this.config.isTreated && 
           !this.config.needValidation;
  }

  onSubmitAdvice() {
    this.submitAdvice.emit();
  }

  onValidate() {
    this.validate.emit();
  }

  onDeliver() {
    this.deliver.emit();
  }

  onOpenDialog() {
    this.openDialog.emit();
  }
}
