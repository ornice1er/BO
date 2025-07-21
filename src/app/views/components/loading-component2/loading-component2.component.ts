import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-component2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-component2.component.html',
  styleUrl: './loading-component2.component.css'
})
export class LoadingComponent2Component {
 @Input() isVisible: boolean = false;
}
