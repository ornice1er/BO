import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-detab-details',
  templateUrl: './detab-details.component.html',
  styleUrls: ['./detab-details.component.css']
})
export class DetabDetailsComponent implements OnInit {

  @Input() selected_data:any;
  @Input() refChild:any;
  @Output() openedFile = new EventEmitter<object>();
  @Output() openedFile2 = new EventEmitter<object>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.refChild)
    console.log(this.selected_data)
  }

  showFile(el:any){
    this.openedFile.emit(el)
  }

  getJson(value:any){
    return JSON.parse(value);;
  }

  showResponseFile(el:any){
    this.openedFile2.emit(el)
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
