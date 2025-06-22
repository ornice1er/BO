import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Config } from 'src/app/app.config';
import { EServiceService } from 'src/app/core/_services/eservice.service';

@Component({
  selector: 'ngx-ads-details',
  templateUrl: './ads-details.component.html',
  styleUrls: ['./ads-details.component.css']
})
export class AdsDetailsComponent implements OnInit {

  @Input() prestation : any;
  @Input() selected_data:any;
  @Input() refChild:any;
  @Output() openedFile = new EventEmitter<object>();
  loading=false;
  fileInput:any
  constructor(
    private eservice:EServiceService,
    config: NgbModalConfig,
     private modalService: NgbModal,
     private toastrService:ToastrService,
     private _sanitizationService: DomSanitizer

  ) { }

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

  open(content:any) {
    this.modalService.open(
      content);
      
  }

  setReportState(){
    this.eservice.state(this.selected_data.ads.id).subscribe((res:any)=>{

    })
  }

  storeR(value:any){
    if (this.fileInput == undefined) {
        this.toastrService.warning('Le fichier est requis')
    }
    let dayOfWeek =new Date(value.deposit_date).getDay();

    if(dayOfWeek===6 || dayOfWeek===0){

      this.toastrService.error(`Veuillez choisir une date de jour ouvré `)
      return ;
    }

    let formData= new FormData();
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key,element)
      }
    }

    formData.append('file',this.fileInput)
    formData.append('has_report',this.selected_data.ads.has_report)
    formData.append('id',this.selected_data.ads.id)

    this.eservice.storeR(formData).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.ngOnInit()
    })
  }
  upload(ev:any){
      if (ev.target.files.length>0) {
          this.fileInput= ev.target.files[0];
      } 
  }

  getUrl(filename:any){
    var url=Config.toFile("docs/ads")+"/"+this.selected_data.code+"/"+filename;
    return this._sanitizationService.bypassSecurityTrustResourceUrl(url)
  }
}
