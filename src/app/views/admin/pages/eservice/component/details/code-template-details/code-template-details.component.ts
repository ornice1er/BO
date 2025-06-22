import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequeteService } from 'src/app/core/_services/requete.service';

@Component({
  selector: 'app-code-template-details',
  templateUrl: './code-template-details.component.html',
  styleUrls: ['./code-template-details.component.css']
})
export class CodeTemplateDetailsComponent {

  @Input() selected_data:any;
  @Input() refChild:any;
  @Output() openedFile = new EventEmitter<object>();
  @Output() openedFile2 = new EventEmitter<object>();
  @Output() openedFile3 = new EventEmitter<object>();
  detail:any
  myList:any[]=[];

  constructor(
    private reqService:RequeteService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.refChild)
    console.log(this.selected_data)
    if (this.selected_data!= undefined) {
    if(this.selected_data.details!=undefined)   this.detail=JSON.parse(this.selected_data.details)
      this.verifyFile()
    }
  }

  showFile(el:any){
    this.openedFile.emit(el)
  }
  showResponseFile(el:any){
    this.openedFile2.emit(el)
  }
  showFileContract(el:any){
    this.openedFile3.emit(el)
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

  verifyFile(){
    this.toastrService.info('Vérification de ficher')
    if (this.detail?.list!=undefined) {
      this.detail.list.forEach((element:any, index:any) => {
        if (element.is_valid==null) {
          this.reqService.verifyFile(this.detail.code,element.npi,index).subscribe((res:any) => {
            this.detail.list[index].is_valid=res.data
          });   
        }
        
      });
    }
  
  }

  requestProof(code:any,index:any){
    this.reqService.requestProof({code:code, index:index}).subscribe((res:any) => {
      this.detail.list[index].is_valid=res.data
    }); 
  }
}
