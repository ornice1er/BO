import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModule, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { RequeteService } from '../../../../core/services/requete.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';

@Component({
  selector: 'ngx-correction',
  templateUrl: './correction.component.html',
    standalone:true,
    imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],

  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit,OnDestroy {
  user:any
  data:any[]=[];
  slug:any;
  selected_data:any;
  loading2=false;
  prestation:any;
  prestationName:any;
  doc_path=""
  doc_prefix=""
  dtTrigger: Subject<any> = new Subject<any>();
  error:any=""
  code:any

  showPreview2=false;
  showPreview=false;
    pdfSrc :SafeResourceUrl | undefined | undefined
  
  constructor(private activatedRoute:ActivatedRoute, private requeteService:RequeteService, private route:ActivatedRoute,
    private _sanitizationService: DomSanitizer,      
    private locService:LocalStorageService,
    config: NgbModalConfig, private modalService: NgbModal,
    private toastrService:ToastrService){
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.data=[];
      this.selected_data=null
      this.slug= this.route.snapshot.paramMap.get('slug');
      this.code= this.route.snapshot.paramMap.get('code');
      this.prestation=this.slug
            this.all()
            this.getName();
            this.user=this.locService.get(GlobalName.user);

    })
  
  }

  all() {
    this.loading2=true;
    this.requeteService.getByPrestationPending(this.slug,this.code).subscribe((res:any)=>{
      this.loading2=false;
     this.data=res;
    },
    (error:any)=>{
      this.loading2=false;
    })
  }

  open(content:any) {

    if(this.selected_data==null){

      return;
    }
    this.modalService.open(
      content);
      
  }

  checked(el:any){
    this.selected_data=el
    console.log(this.selected_data)
  }


  authorized(){
    /*this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(result =>{
      if(result){*/

        this.requeteService.update(this.selected_data.id,{}).subscribe(
            (res:any)=>{
              //MyToastr.make('success',"Autorisation de modification",`La demande ${this.selected_data.code} a été autorisée pour modification avec succès`,this.toastrService)
            this.loading2=false;
            this.all();
        },
        (err:any)=>{
            this.loading2=false;
            //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)
    
        })
    //  }})
  
  }
  getName(){

    switch (this.prestation) {
      case "attestation-de-non-litige":
        this.prestationName="d'attestation de non litige"
        break;
      case "declaration-etablissement":
        this.prestationName="de déclaration d'établissements"
        break;
        case "autorisation-de-stage":
          this.prestationName="d'autorisation de stage"
          break;
          case "attestation-de-stage":
            this.prestationName="d'attestation de stage"
            break;
            case "attestation-de-service-fait":
              this.prestationName="d'attestation de service fait"
              break;
    
      default:
        break;
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  showFile(name:any){

  }

  showFile2(el:any){
    this.selected_data=el.code+"/"+el.filename
  }
}
