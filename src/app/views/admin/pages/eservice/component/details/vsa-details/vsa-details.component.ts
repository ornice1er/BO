import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-vsa-details',
  templateUrl: './vsa-details.component.html',
  styleUrls: ['./vsa-details.component.css']
})
export class VsaDetailsComponent implements OnInit {

  @Input() selected_data:any;
  @Input() refChild:any;
  @Output() openedFile = new EventEmitter<object>();

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
