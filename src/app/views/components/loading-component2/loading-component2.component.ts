import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loading-component2',
    imports: [CommonModule],
    templateUrl: './loading-component2.component.html',
    styleUrl: './loading-component2.component.css'
})
export class2Component {
 @Input() isVisible: boolean = false;
}
