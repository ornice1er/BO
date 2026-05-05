import { CommonModule, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { AgendaService } from '../../../../core/services/agenda.service';
import { RequeteService } from '../../../../core/services/requete.service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
    selector: 'ngx-agenda',
    templateUrl: './agenda.component.html',
    imports: [CommonModule, FormsModule, NgbModule, LoadingComponent, SampleSearchPipe, NgSelectModule, NgxPaginationModule, MatTooltipModule],
    styleUrls: ['./agenda.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AgendaComponent implements OnInit {
  @ViewChild("dialog") dialog :TemplateRef<any> | undefined;
  @ViewChild('addContent') addContentTpl!: TemplateRef<any>;

  selected_data:any
  data:any[]=[]
  user:any
  permissions:any[]=[]
  user_prestations:any[]=[]
  requetes:any[]=[]
  loading=false
  error=""
  loading2=false
  canTransmit=true
  role=""
  canSendMail=true
  mailSentIds = new Set<number>()
  is_active=true
  code:any
  codeP:any
  slug:any
  upId:any
  reqId:any
    pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
   search_text=""
  remoteSearchData: any[] = []
  selectedId: number | null = null;
  buttonsPermission :any|undefined;

  
  
      constructor(
        private agendaService:AgendaService,
         private locService:LocalStorageService,
        config: NgbModalConfig, private modalService: NgbModal,
        private requeteService:RequeteService,
        private toastrService:ToastrService,
        private activatedRoute:ActivatedRoute

        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 


  loadRequetes(event:any){
       this.codeP=this.user_prestations.find((el:any)=>el.prestation.id==event.target.value).prestation.code
    this.getRequetes()
  }
  getRequetes(){  
  this.requeteService.getByPrestationAll(this.codeP).subscribe((res:any)=>{
        this.requetes=res.data

        })
  }
  
ngOnInit(): void {
  this.user = this.locService.get(GlobalName.userName);
  this.user_prestations = this.user.user_prestations;
  this.role = this.user.roles[0].name;

  this.activatedRoute.paramMap.subscribe(params => {
    const codePrestation = params.get('code');       // code prestation
    const codeRequete = params.get('requete');       // code requete

    if (codePrestation && codeRequete) {
      // Cas 3 : /agenda/:code/:requete — préselection prestation + requete
      this._initWithPrestationAndRequete(codePrestation, codeRequete);

    } else if (codePrestation) {
      // Cas 2 : /agenda/:code — filtrer par prestation
      this._initWithPrestation(codePrestation);

    } else {
      // Cas 1 : /agenda — tout afficher
      this._initDefault();
    }
  });

  this.buttonsPermission = { show: true, add: true, edit: true, delete: true };
}

private _initDefault(): void {
  this.upId = undefined;
  this.reqId = undefined;
  this.getData();
}

private _initWithPrestation(codePrestation: string): void {
  // Trouver l'upId correspondant au code prestation
  const found = this.user_prestations.find(
    (up: any) => up.prestation.code === codePrestation
  );
  if (found) {
    this.upId = found.id;
    this.codeP = codePrestation;
    this.getRequetes(); // charge les requetes filtrées
  }
  this.getData();
}

private _initWithPrestationAndRequete(codePrestation: string, codeRequete: string): void {
  const found = this.user_prestations.find(
    (up: any) => up.prestation.code === codePrestation
  );
  if (found) {
    this.upId = found.id;
    this.codeP = codePrestation;

    this.requeteService.getByPrestationAll(this.codeP).subscribe((res: any) => {
      this.requetes = res.data;
      const req = this.requetes.find((r: any) => r.code === codeRequete);
      if (req) {
        this.reqId = req.id;
      }
      this.modalService.open(this.addContentTpl, { size: 'lg' });
    });
  }
  this.getData();
}

// Méthode unifiée de chargement des données
getData(): void {
  this.loading2 = true;
  if (this.codeP) {
    this.requeteService.getForAgenda(this.codeP).subscribe(
      (res: any) => { this.data = res.data; this.loading2 = false; },
      () => { this.loading2 = false; }
    );
  } else {
    this.agendaService.getAll().subscribe(  // ← adapte selon ton service
      (res: any) => { this.data = res.data; this.loading2 = false; },
      () => { this.loading2 = false; }
    );
  }
}

loadData(event:any){
  this.codeP=this.user_prestations.find((el:any)=>el.prestation.id==event.target.value).prestation.code
  this.getData()
}
  

    getByPrestation() {
      this.loading2=true;
      this.agendaService.getByPrestation(this.slug).subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
  
    checked(el:any){
      this.selected_data=el
      if (el.ua_up ==this.user.agent.unite_admin.id) {
        this.canTransmit=true
      }else{
        this.canTransmit=false

      }

      if (this.role=="Directeur" && el.status ==0) {
        this.canSendMail=true
      }else{
        this.canSendMail=false

      }
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
    store(value:any) {
     /* var date_start= new Date(value.date_start)
      var date_end= new Date(value.date_end)
      var today= new Date();*/

      let d2 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      let d1 =formatDate(value.date_start,'yyyy-MM-dd','en_US');

      if(d1 < d2){
        this.error="Impossible de choisir une date antérieure"
        this.toastrService.error("Impossible de choisir une date antérieure")

      }else{
        if (this.reqId!=undefined) {
          value.requete_id=this.reqId
        }
        this.loading=true;
        this.agendaService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
           this.modalService.dismissAll()
            this.getData();
            this.toastrService.success("Un programme enregistrée, mail envoyé à l'usager")
        },
        (err:any)=>{
            this.loading=false;
        })
  
      }
     
  }
  
  update(value:any) {
    this.loading=true;
    console.log(value)
      this.agendaService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.modalService.dismissAll()
          this.getData();
          //MyToastr.make('success',"Type Entité","Modification des types entités",this.toastrService)
  
      },
      (err:any)=>{
          this.loading=false;
      })
  
  }
  
  
  delete() {
      this.loading=true;
      if(confirm('Voulez vous supprimer cet élément')){
        this.agendaService.delete(this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.getData();
          //MyToastr.make('success',"Type Entité","Suppression de type entité",this.toastrService)
      },
      (err:any)=>{
          this.loading=false;
      })
      }
  
  }

  getStatus(state:any){

    switch (state) {
      case 0:
          return "Ouvert"
        break;
    
        case 1:
          return "Envoyé"
        break;
    
        case 2:
          return "Cloturé"
        break;
    
      default:
        return "";
        break;
    }

  }

  transUp(){
    this.agendaService.transUp(this.selected_data.id).subscribe(
      (res:any)=>{
      this.loading=false;
      this.getData();
      this.toastrService.success("Transmission de la proposition de rendez vous")
  },
  (err:any)=>{
      this.loading=false;
  })
  }
  sendMail(){
    if (!this.verifyIfElementChecked()) return;
    AppSweetAlert.confirmBox('question', 'Envoi de mail', 'Confirmer l\'envoi du mail de rendez-vous à l\'usager ?').then((result: any) => {
      if (!result.isConfirmed) return;
      this.loading = true;
      this.toastrService.info('Envoi en cours…');
      this.agendaService.SendMail(this.selected_data.id).subscribe(
        (res: any) => {
          this.loading = false;
          this.mailSentIds.add(this.selected_data.id);
          this.getData();
          this.toastrService.success('Mail envoyé à l\'usager');
        },
        (err: any) => {
          this.loading = false;
          this.toastrService.error('Échec d\'envoi du mail');
        }
      );
    });
  }


      setStatus(value:any){
    
        this.toastrService.warning("Opération en cours")
          this.loading=true
            this.requeteService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
              this.toastrService.success(res.message)
              this.loading=false
              this.getData()
          },
          (err:any)=>{
            this.loading=false
            console.log(err)
              AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
          })
      }

   onSearchChange() {
  const localResults = this.data.filter((d:any) => d.name?.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.agendaService.search({term:this.search_text}).subscribe({
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
  this.pg.p = 1;
  this.getData();
}

    getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
      this.getData();
    } else {
          this.pg.p=event
    }
  }
}
