import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-panel',
  templateUrl: './help-panel.component.html',
  imports: [CommonModule],
})
export class HelpPanelComponent {
  @Input() title: string = 'Guide';
  visible = false;
  toggle() { this.visible = !this.visible; }
}
