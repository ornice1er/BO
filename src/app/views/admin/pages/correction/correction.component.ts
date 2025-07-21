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
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

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
  loading=false;
  prestation:any;
  prestationName:any;
  doc_path=""
  doc_prefix=""
  dtTrigger: Subject<any> = new Subject<any>();
  error:any=""
  buttonsPermission :any|undefined;
is_active=false
search_text:any=""
remoteSearchData: any[] = []
selectedId: number | null = null;
  code:any
    pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true

  showPreview2=false;
  showPreview=false;
  pdfSrc :SafeResourceUrl | undefined | undefined
  showLastLevel=false;
  selectedFilter = '';

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
  
     this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
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

add(content:any){
    this.modalService.open(content,{size:'lg'});
  }


  show(content:any){
    if(!this.verifyIfElementChecked()) return ;
    
    this.modalService.open(content,{size:'lg'});
  }



  edit(content:any){
    if(!this.verifyIfElementChecked()) return ;
    this.modalService.open(content,{size:'lg'});

  }

  verifyIfElementChecked(){
    console.log(this.selected_data)
    if (this.selected_data==null) {
      this.toastrService.warning("Aucun élément selectionné");
      return false;
    }
    return true;
  }

  checked(el:any){
    this.selected_data=el
    console.log(this.selected_data)
  }

      setStatus(value:any){
    
        this.toastrService.warning("Opération en cours")
          this.loading=true
            this.requeteService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
              this.toastrService.success(res.message)
              this.loading=false
              this.all()
          },
          (err:any)=>{
            this.loading=false
            console.log(err)
              AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
          })
      }
      

      delete(){

      }

   onSearchChange() {
  const localResults = this.data.filter((d:any) => d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.requeteService.search({search:this.search_text}).subscribe({
    next: (result:any) => {
      this.remoteSearchData = result.data;
      this.data = this.remoteSearchData;
      this.pg.p=1
      this.pg.total=this.data.length
      this.loading = false;
      console.log(this.remoteSearchData);
    },
    error: (err:any) => {
      console.error(err);
      this.loading = false;
    }
  });
}

resetSearch() {
  this.search_text = '';
  this.isPaginate=true;
  this.pg.p = 1; // reset pagination si utilisée
  this.all(); // méthode pour recharger les données initiales
}


    getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
      this.all();
    } else {
          this.pg.p=event
    }
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

    store(value:any){

  }
  update(value:any){

  }
}
