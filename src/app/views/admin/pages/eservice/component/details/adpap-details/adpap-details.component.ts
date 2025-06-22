import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-adpap-details',
  templateUrl: './adpap-details.component.html',
  styleUrls: ['./adpap-details.component.css']
})
export class AdpapDetailsComponent implements OnInit {
  @Output() openedFile = new EventEmitter<object>();

  @Input() selected_data:any;
  @Input() refChild:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.refChild)
    console.log(this.selected_data)
  }

  showFile(el:any){
    this.openedFile.emit(el)
  }
  
  getDecision(state:any){
    switch (state) {
      case 0:
          return"Défavorable"
        break;
        case 1:
          return"Favorable"

          break;
          case 2:
            return"Mise en attente"

            break;
    
      default:
        return "";
        break;
    }
  }

  
}
