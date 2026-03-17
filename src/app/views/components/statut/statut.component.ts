import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-statut',
    imports: [CommonModule],
    templateUrl: './statut.component.html',
    styleUrl: './statut.component.css'
})
export class StatutComponent {
  @Input() status='';

}
