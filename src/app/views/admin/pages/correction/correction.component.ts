import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyToastr } from '../../../app.toastr';
import { RequeteService } from '../../../core/_services/requete.service';
import { Subject } from 'rxjs';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataTableDirective } from 'angular-datatables';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { globalName } from 'src/app/core/_utils/utils';


@Component({
  selector: 'ngx-correction',
  templateUrl: './correction.component.html',
  styleUrls: ['./correction.component.css']
})
export class CorrectionComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective) dtElement: DataTableDirective | undefined;
  user:any
  data:any[]=[];
  slug:any;
  selected_data:any;
  loading2=false;
  prestation:any;
  prestationName:any;
  doc_path=""
  doc_prefix=""
  dtOptions: DataTables.Settings = {
    language: {
      processing:     "Traitement en cours...",
      search:         "Rechercher&nbsp;:",
      lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
      info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
      infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
      infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
      infoPostFix:    "",
      loadingRecords: "Chargement en cours...",
      zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
      emptyTable:     "Aucune donnée disponible dans le tableau",
      paginate: {
          first:      "Premier",
          previous:   "Pr&eacute;c&eacute;dent",
          next:       "Suivant",
          last:       "Dernier"
      },
      aria: {
          sortAscending:  ": activer pour trier la colonne par ordre croissant",
          sortDescending: ": activer pour trier la colonne par ordre décroissant"
      }
  }
  };
  dtTrigger: Subject<any> = new Subject<any>();
  error:any=""
  code:any

  showPreview2=false;
  showPreview=false;
    pdfSrc :SafeResourceUrl | undefined | undefined
  
  constructor(private activatedRoute:ActivatedRoute, private requeteService:RequeteService, private route:ActivatedRoute,
    private _sanitizationService: DomSanitizer,      
    private locService:LocalService,
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
            this.user=this.locService.getItem(globalName.user);

    })
  
  }

  all() {
    this.loading2=true;
    this.requeteService.getByPrestationPending(this.slug,this.code).subscribe((res:any)=>{
      this.loading2=false;
     this.data=res;
     this.dtTrigger.next();
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
