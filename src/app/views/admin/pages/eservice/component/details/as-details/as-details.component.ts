import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequeteService } from '../../../../../../core/_services/requete.service';

@Component({
  selector: 'ngx-as-details',
  templateUrl: './as-details.component.html',
  styleUrls: ['./as-details.component.css']
})
export class AsDetailsComponent implements OnInit {

  @Input() selected_data:any;
  @Input() refChild:any;
  ads:any;
  @Output() openedFile = new EventEmitter<object>();
  @Output() adsData = new EventEmitter<object>();

  constructor( private requeteService:RequeteService) { }

  ngOnInit(): void {
    console.log(this.refChild)
    console.log(this.selected_data)
  //  this.concat();
  }

  concat(){
    this.requeteService.concat({prestation:'attestation-de-stage',ads:this.selected_data.as.ads}).subscribe((res:any)=>{
      this.ads=res;
      this.adsData.emit(res);
      console.log(this.ads);
    },
    (error:any)=>{
      
    })
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
