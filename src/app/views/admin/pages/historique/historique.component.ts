import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Config } from '../../../app.config';
import { RequeteService } from '../../../core/_services/requete.service';
import { CodeDecoder, globalName } from '../../../core/_utils/utils';
import { Subject } from 'rxjs';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit,OnDestroy,AfterViewInit  {
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  isDtInitialized:boolean = false

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

  showPreview2=false;
  showPreview=false;
    pdfSrc :SafeResourceUrl | undefined | undefined
  
  constructor(
    private activatedRoute:ActivatedRoute,
     private requeteService:RequeteService, 
     private route:ActivatedRoute, 
     private _sanitizationService: DomSanitizer,      
       private locService:LocalService,
       config: NgbModalConfig, private modalService: NgbModal,
       private toastrService:ToastrService
     ){
      config.backdrop = 'static';
          config.keyboard = false;
  }
  ngAfterViewInit(): void {
   // this.dtTrigger.next();
}
rerender(){
  if (this.isDtInitialized) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  } else {
    this.isDtInitialized = true
    this.dtTrigger.next();
  }
 }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.data=[];
      this.selected_data=null
     this.slug= this.route.snapshot.paramMap.get('slug');
     this.prestation=this.slug
      this.all()
      this.getName();
    })
    this.user=this.locService.getItem(globalName.user);
  }

  all() {
    this.loading2=true;
    this.requeteService.getByPrestationAll(this.slug).subscribe((res:any)=>{
      this.loading2=false;
     this.data=res;
     this.rerender();
    },
    (error:any)=>{
      this.loading2=false;
    })
  }

  open(content:any) {

    if(this.selected_data==null){

      return;
    }
    this.modalService.open(content,{size:'lg'})
   // this.modalService.dismissAll()
      
  }
  checked(el:any){
    this.selected_data=el
    console.log(this.selected_data)
  }
 /* showFile2(name:any){
    
    var url=Config.toFile(this.doc_path)+"/attestation/"+name;
    window.open(url, '_blank');
  }*/

  showFile2(el?:any){
    if(this.selected_data==null){
      alert("Veuillez sélectionner une ligne !")
      return;
    }
    //var url=Config.toFile(this.doc_path)+"/"+name;
    //window.open(url, '_blank');

    var url=Config.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
    console.log(url)
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview2=true;
      //ref.close()
   /* var url=Config.toFile('litige/files')+name;
    window.open(url, '_blank');*/
  }
  getName(){

    switch (this.prestation) {
      case "attestation-de-non-litige":
        this.prestationName="d'attestation de non litige"
        this.doc_path="docs/atn"
        break;
      case "declaration-etablissement":
        this.prestationName="de déclaration d'établissements"
        this.doc_path="docs/detab"
        break;
        case "autorisation-de-stage":
          this.prestationName="d'autorisation de stage"
          this.doc_path="docs/ads"
          break;
          case "attestation-de-stage":
            this.prestationName="d'attestation de stage"
            this.doc_path="docs/as"
            break;
            case "attestation-de-service-fait":
              this.prestationName="d'attestation de service fait"
              this.doc_path="docs/asf"
                           break;
              case "visa-reglement-interieur-entreprise":
                this.prestationName="de délivrance de visa sur les règlements intérieurs d’entreprises"
                this.doc_path="docs/ri"
                this.doc_prefix="ri"
                break;
                case "autorisation-de-licenciement-pour-motif-economique-ou-motif-personnel":
                  this.prestationName="d'autorisation de licenciement pour motif économique ou motif personnel (DGT) (Salaires protégés ou non)"
                  this.doc_path="docs/al"; this.doc_prefix="al";
                  break;
                  case "visa-contrat-apprentisage":
                    this.prestationName="de visa de contrat d’apprentissage "
                         this.doc_path="docs/vca" ;  this.doc_prefix="vca"
                    break;
                    case "decision-agrement-exercice-medecin":
                      this.prestationName="délivrance de décision d’agrément d’exercice en qualité de médecin d’entreprise "
                      this.doc_path="docs/am"; this.doc_prefix="am";
                      break;
                    case "decision-agrement-exercice-medecin":
                      this.prestationName="délivrance de décision d’agrément d’exercice en qualité de médecin d’entreprise "
                      this.doc_path="docs/am"; this.doc_prefix="am";
                      break;
                      case "attestation-existence":
                        this.prestationName="délivrance dattestation d'existence "
                        this.doc_path="docs/ae"; this.doc_prefix="ae";
                        break;
                        case "certificat-de-non-radiation":
                          this.prestationName="délivrance dattestation d'existence "
                          this.doc_path="docs/cnr"; this.doc_prefix="ae";
                          break;
                          case "attestation-de-validite-des-services":
                            this.prestationName="délivrance dattestation d'existence "
                            this.doc_path="docs/vsa"; this.doc_prefix="ae";
                            break;
      default:
        break;
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  back(){
    this.all()
    this.showPreview2=false;
    this.selected_data=null

  }
}
