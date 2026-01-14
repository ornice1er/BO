import { CommonModule, formatDate } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  standalone:true,
  imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit,AfterViewInit {
  @ViewChild("dialog") dialog :TemplateRef<any> | undefined;

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
  ngAfterViewInit(): void {
    if (this.slug != undefined) {
      this.upId=this.user_prestations.find((el:any)=>el.prestation.slug==this.slug)?.id

    }
    if (this.code !=undefined && this.slug != undefined) {
      this.upId=this.user_prestations.find((el:any)=>el.prestation.slug==this.slug).id
      this.requeteService.getForAgenda(this.slug,this.codeP).subscribe((res:any)=>{
        this.requetes=res
      //  this.reqId=this.code
       this.reqId=this.requetes.find((el:any)=>el.code==this.code)?.id
        this.add(this.dialog)

        })
  }
  }
  
    ngOnInit(): void {
      this.user=this.locService.get(GlobalName.userName);
      this.user_prestations=this.user.userprestation
      this.role=this.user.roles[0].name;
      
      this.activatedRoute.paramMap.subscribe(params => {
        this.selected_data=null
        this.code=this.activatedRoute.snapshot.paramMap.get('code')
        this.codeP=this.activatedRoute.snapshot.paramMap.get('codeP')
        this.slug=this.activatedRoute.snapshot.paramMap.get('slug')

        if (this.slug != undefined && this.slug!=null ) {
          this.getByPrestation()
        }else{
          this.all();

        }
       });  
   
     
    this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    }
  
    all() {
      this.loading2=true;
      this.agendaService.getAll().subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
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
            this.all();
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
          this.all();
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
          this.all();
          //MyToastr.make('success',"Type Entité","Suppression de type entité",this.toastrService)
      },
      (err:any)=>{
          this.loading=false;
      })
      }
  
  }
  
  loadRequete(event:any){
this.requeteService.getForAgenda( this.user_prestations.find((el:any)=>el.prestation.id==event.target.value).prestation.slug).subscribe((res:any)=>{
this.requetes=res
})
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
      this.getByPrestation();
      this.toastrService.success("Transmission de la proposition de rendez vous")
  },
  (err:any)=>{
      this.loading=false;
  })
  }
  sendMail(){
    this.toastrService.info('Opération en cours')
    this.agendaService.SendMail(this.selected_data.id).subscribe(
      (res:any)=>{
        this.toastrService.info('Mail Envoyé')

      this.loading=false;
      this.all();
      this.toastrService.success("Transmission de la proposition de rendez vous")
  },
  (err:any)=>{
    this.toastrService.info('Echec d\'envoi du mail')

      this.loading=false;
  })
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

   onSearchChange() {
  const localResults = this.data.filter((d:any) => d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.agendaService.search({search:this.search_text}).subscribe({
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
}
