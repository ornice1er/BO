import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Config } from 'src/app/app.config';
import { AffectationService } from 'src/app/core/_services/affectation.service';
import { RequeteService } from 'src/app/core/_services/requete.service';
import { ResponseService } from 'src/app/core/_services/response.service';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { globalName } from 'src/app/core/_utils/utils';
import { PrestationDetails } from '../prestation-details';

@Component({
  selector: 'app-espace-validation',
  templateUrl: './espace-validation.component.html',
  styleUrls: ['./espace-validation.component.css']
})
export class EspaceValidationComponent implements OnInit {

  @ViewChild(DataTableDirective , {static: false})dtElement!: DataTableDirective;
  isDtInitialized:boolean = false
  selected_data:any
  data:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  loading=false
  loading2=false
  permissions:any[]=[];
  radioGroupValue:any;
  responseUA={
    hasPermission:true,
    reason:"",
    observation:"",
    unite_admin_id:"",
    requete_id:""
  }
  content = null
  user:any;
  currentDescId='0';
  selected_file:any
  prestation:any;
  prestationName:any;
  desc=""
  doc_path=""
  doc_prefix=""
  observation="";
  activeobsPanel=false
  showPreview2=false;
  showPreview=false;
  myPrestation:any
  showResponseFilePreview=false;
  code:any;

  pdfSrc :SafeResourceUrl | undefined | undefined | undefined
  fileUploaded:File | undefined | null
  fileUploaded2:File| undefined | null
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
  docs=[
    {
      id:0,
      name:"Contenu lettre d'acceptation",
      content:null
    },
    {
      id:1,
      name:"Contenu lettre d'agrément",
      content:null

    },
    {
      id:2,
      name:"Contenu autorisation de stage",
      content:null
    }
  ]
      constructor(
        private activatedRoute:ActivatedRoute ,
        private locService:LocalService,
        private affService:AffectationService,
        private requeteService:RequeteService,
        private toastrService:ToastrService,
        private router:Router,
        private responseService:ResponseService,
        private modalService:NgbModal,
        private _sanitizationService: DomSanitizer){
     
      } 
  
    ngOnInit(): void {
    
 

      this.activatedRoute.paramMap.subscribe(params => {
        this.selected_data=null
        this.data=[]
        this.responseUA={
          hasPermission:true,
          reason:"",
          observation:"",
          unite_admin_id:"",
          requete_id:""
        }
        this.fileUploaded=null
        this.prestation=this.activatedRoute.snapshot.paramMap.get('slug')
        this.code=this.activatedRoute.snapshot.paramMap.get('code')
        this.user=this.locService.getItem(globalName.user);
        this.permissions=this.user.roles[0].permissions;
        this.myPrestation=this.user.userprestation.find((el:any)=>el.prestation.slug ==this.prestation).prestation

        this.all();
        this.getName(this.prestation);
        console.log(this.user);
       });  
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
  
  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //      dtInstance.destroy();
  //      this.dtTrigger.next();     
  //   });
  // }
  
    all() {
      
      console.log(this.prestation)
      this.loading2=true;
      this.requeteService.getByPrestationTreated(this.prestation,this.myPrestation.code).subscribe((res:any)=>{
        this.data.length=0
        this.data=res
        this.loading2=false;
        this.modalService.dismissAll()
      if(res.length!=0)  this.rerender()
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

  
    checked(el:any){
      this.selected_data=el
      console.log(this.selected_data)

      if(this.selected_data?.reponses!.length !=0){
        var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
        if(check) this.responseUA=check;
      }
      this.docs[0].content=this.selected_data.content
      this.docs[1].content=this.selected_data.content2
      this.docs[2].content=this.selected_data.content3
    }
  
    
    open(content:any) {

      if(this.selected_data==null){
         this.toastrService.warning("Aucun élément selectionné");

        return;
      }
      
      //this.dialogService.open(
  //      dialog);
        
    }
    open2(content:any) {

      if(this.selected_data==null){
         this.toastrService.warning("Aucun élément selectionné");

        return;
      }
      if(this.selected_data.reponses.length !=0){
        var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
        if(check == null && this.user.roles[0].name != 'Directeur') {
          this.toastrService.warning("`Votre projet de réponse est requis");
          return ;
        }
      }else{
        this.toastrService.warning("`Votre projet de réponse est requis");
        return ;
      }

      this.content=this.selected_data.content
      console.log(this.content)
      this.prepareDesc()
      //this.dialogService.open(
  //      dialog);
        
    }

    open3(){

    }
  
    openWindow(contentTemplate:any) {
      this.activeobsPanel=false;
      if(this.selected_data==null){
         this.toastrService.warning("Aucun élément selectionné");

        return;
      }

      if(this.selected_data.reponses.length !=0){
        var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
        if(check) this.responseUA=check;

        
      }
     // this.windowService.open(
       // contentTemplate,{title:"Elaboration d'un projet de réponse"}
//      );
      
    }

    hasPermission(permission:any){
      var check= this.permissions.find((e:any)=>e.name ==permission)
      if(check) return true;
      return false
    }

 
  storeResponse(ref:any,value:any){
    
    this.loading=true;
    this.responseUA.unite_admin_id=this.user.agent.unite_admin.id
    this.responseUA.requete_id=this.selected_data.id
    //MyToastr.make('info',"Affectation",`Opération en cours`,this.toastrService)
    var formData=new FormData();
    formData.append('responseUA',JSON.stringify(this.responseUA))
    if(this.fileUploaded!=null){
      formData.append('file',this.fileUploaded)
      formData.append('requete_id',JSON.stringify(this.selected_data.id))
    }
    formData.append('structure',value.structure)
    formData.append('service',value.service)
    formData.append('date_start',value.date_start)
    formData.append('date_end',value.date_end)
    formData.append('prestation',this.prestation)

    console.log(value)
    
    this.requeteService.storeResponse(formData).subscribe(
        (res:any)=>{
        this.loading=false;
        ref.close()
        this.all();
        //MyToastr.make('success',"Projet de réponse","Votre avis a été enregistré",this.toastrService)
        this.responseUA={
          hasPermission:true,
          reason:"",
          observation:"",
          unite_admin_id:"",
          requete_id:""
        }
    },
    (err:any)=>{
        this.loading=false;
        //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)

    })
  }

  deliveryrDoc(value:any, ref:any){
 /*   this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(result =>{
      if(result){*/

       // ref.close()
        var formData=new FormData()
        formData.append('content',value.contenu)
        formData.append('currentDescId',this.currentDescId)
        formData.append('id',JSON.stringify(this.selected_data.id))

        //MyToastr.make('info',"Enregistrement du contenu livrable",`Opération en cours`,this.toastrService)

        this.responseService.storeContent(formData).subscribe(
            (res:any)=>{
            //MyToastr.make('success',"Enregistrement du contenu livrable",`L'attestation est prête à être délivrée`,this.toastrService)
            this.loading=false;
           // this.selected_data=null

            let index=this.docs.findIndex((el:any)=>el.id==parseInt(this.currentDescId))
            this.docs[index].content=value.contenu
            console.log(index,parseInt(this.currentDescId),this.docs)

            this.all()


        },
        (err:any)=>{
            this.loading=false;
             this.toastrService.error("Opération échouée");
    
        })
   //   }})
  
  }
  transDown(value:any, ref:any){
    var d1 = new Date(value.delay)
    var d2 = new Date()
   
    if(d1 < d2){

      //MyToastr.make('danger',"Affectation",`Veuillez choisir une date ultérieure `,this.toastrService)
      return ;
    }



   /* this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(result =>{
      if(result){*/

        ref.close()

        //MyToastr.make('info',"Affectation",`Opération en cours`,this.toastrService)

        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          sens:1,
          instruction:value.instruction,
          delay:value.delay,
        }).subscribe(
            (res:any)=>{
               this.toastrService.success("`La demande ${this.selected_data.code} a été affectée avec succès");
            this.loading=false;
            this.all();
        },
        (err:any)=>{
            this.loading=false;
            //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)
    
        })
      //}})
  
  }

  decline(value:any, ref:any){
   if(confirm("Envoyer le mail de rejet")){
          //MyToastr.make('info',"Opération encours","Annulation en cours",this.toastrService)
          this.loading=true;
          this.responseService.decline({
            prestation:this.prestation,
            prestation_name:this.prestationName,
            requete_id:this.selected_data.id,
            commentaire:value.commentaire
          }).subscribe((res:any)=>{
           this.all()
            this.loading=false;
            ref.close()
            this.selected_data=null;
            //MyToastr.make('success',"Rejet de demande",`La demande de code ${this.selected_data.code} a été rejetée avec succès`,this.toastrService)

          },
          (error:any)=>{
            
            this.loading=false;
            //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)

          })
        }
    
  }
  authorized(value:any){
    if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
      //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
      return ;
    }
        this.loading=true;
        this.responseService.authorized({
          password:value.password,
      
          requete_id:this.selected_data.id
        }).subscribe((res:any)=>{
   
          this.loading=false;

         this.all()
          
          //MyToastr.make('success',"Envoi d'attestation",`L'attestaion issue de la demande ${this.selected_data.code} a été envoyéee avec succès`,this.toastrService)

        },
        (error:any)=>{
          this.selected_data=null
          this.loading=false;
          //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)

      })
  
 
}
  
  transUp(){
    if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
    if(this.selected_data.reponses.length !=0){
      var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
      if(check == null) {
        this.toastrService.warning("`Votre projet de réponse est requis");
        return ;
      }
    }else{
      this.toastrService.warning("`Votre projet de réponse est requis");
      return ;
    }

   /* this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(result =>{
      if(result){*/
        //MyToastr.make('info',"Transmission",`Opération en cours`,this.toastrService)
        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          sens:-1
        }).subscribe(
            (res:any)=>{
            this.loading=false;
            this.all();
            //MyToastr.make('success',"Transmission",`La demande ${this.selected_data.code} a été transmise avec succès`,this.toastrService)
    
        },
        (err:any)=>{
            this.loading=false;
            //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)
    
        })
    //  }
   // });
   
  }

  showFile2(event?:any){
    if(this.selected_data==null){
      alert("Veuillez sélectionner une ligne !")
      return;
    }
    //var url=Config.toFile(this.doc_path)+"/"+name;
    //window.open(url, '_blank');

    var url=Config.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview2=true;
    
      //ref.close()
   /* var url=Config.toFile('litige/files')+name;
    window.open(url, '_blank');*/
  }
  showFile3(name:any){
    if(this.selected_data==null){

      return;
    }
    
    var url=Config.toFile(this.doc_path)+"/"+name;
    window.open(url, '_blank');
  }
  //name,file,ref,code
  showFile(el:any){
    var url=Config.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+el.filename;
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true;
    this.observation="";
    this.selected_file=el;
    
      $('#cBtn').trigger('click');
      //ref.close()
      this.activeobsPanel=true;
   /* var url=Config.toFile('litige/files')+name;
    window.open(url, '_blank');*/
  }

  storeAmend(ref:any){
    console.log(this.selected_file)
    this.responseUA.observation=`Les observations suivantes sont à prendre en compte sur le fichier suivant ${this.selected_file.filename}: \n ${this.observation} \n`
    ref.close();
    
    this.activeobsPanel=true
  }

  getName(slug:any){
    let check=PrestationDetails.find((e:any)=> e.slug == slug);
    if (check) {
      this.prestationName=check.name
      this.doc_path=check.doc_path
    }
  }

  prepareDesc(el?:any){
    if (this.selected_data.content?.content !=null) {
      this.desc=this.selected_data.content
    } else {
       let data=this.selected_data;
    if(this.prestation=="attestation-de-stage") data=el;
    let check=PrestationDetails.find((e:any)=> e.slug == this.prestation);
    console.log(this.selected_data,check)
  if (check) {
    this.desc=check.desc(data)
    
    
  }
    }
   
  }
  upload(event:any){
    this.fileUploaded=event.target.files[0]
    console.log(this.fileUploaded)
  }
  upload2(event:any){
    this.fileUploaded2=event.target.files[0]
    
  }


  getAddress(address:any){

    var add=JSON.parse(address)

    return add.departement+"~"+add.commune+"~"+add.arrondissement+"~"+add.quartier+"~"+add.rue+"~"+add.address

  }

  treat(req:any,file:any){
    
    this.router.navigateByUrl('/admin/eservice/treatment/'+req+"/"+file+"/"+this.prestation)
  }

  back(){
    this.showPreview=false;
    this.showPreview2=false;
    this.selected_data=null
    this.all()

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  needCorrection(value:any,ref:any){
    if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
    /*  this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(result =>{
        if(result){*/
          //MyToastr.make('info',"Demande de correction",`Opération en cours`,this.toastrService)

          this.responseService.correction({
            requete_id:this.selected_data.id,
            commentaire:value.commentaire
          
          }).subscribe(
              (res:any)=>{
              this.loading=false;
              this.all();
              ref.close()
              this.selected_data=null;
               this.toastrService.success("La demande ${this.selected_data.code} a été suspension avec succès");
      
          },
          (err:any)=>{
              this.loading=false;
               this.toastrService.error("Opération échouée");
      
          })
      //  }
    //  });
    
   
  }
  sendReachedAgreement(value:any,ref:any){
 
    /*  this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(result =>{
        if(result){*/
          //MyToastr.make('info',"Suspension pour accord à l'amiable",`Opération en cours`,this.toastrService)

          this.responseService.reachedAgreement({
            requete_id:this.selected_data.id
          
          }).subscribe(
              (res:any)=>{
              this.loading=false;
              this.all();
             
              this.selected_data=null;
              //MyToastr.make('success',"Suspension pour accord à l'amiable",`La demande ${this.selected_data.code} a été suspension avec succès`,this.toastrService)
      
          },
          (err:any)=>{
              this.loading=false;
               this.toastrService.error("Opération échouée");
      
          })
       // }
    //  });
    
   
  }

  
  delivered(){
      if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
        //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
        return ;
      }
       if(confirm("Envoyer l'attestation au demandeur")){
          //MyToastr.make('info',"Opération encours","Autorisation en cours d'envoi",this.toastrService)
          this.loading=true;
          this.responseService.store({
            prestation:this.prestation,
            prestation_name:this.prestationName,
            requete_id:this.selected_data.id
          }).subscribe((res:any)=>{
           this.all()
            this.loading=false;
            
            //MyToastr.make('success',"Envoi d'attestation",`L'attestaion issue de la demande ${this.selected_data.code} a été envoyéee avec succès`,this.toastrService)

          },
          (error:any)=>{
            this.selected_data=null
            this.loading=false;
            //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)

          })
        }
    
   
  }

  changeDesc(event:any){
    let check=PrestationDetails.find((e:any)=> e.slug == this.prestation);
  if (check) {
    this.currentDescId=event.target.value;
    switch (this.currentDescId) {
      case '0':
        this.desc=check.desc(this.selected_data)
        break;
      case '1':
        this.desc=check.desc2(this.selected_data)
        break;
      case '2':
        this.desc=check.desc3(this.selected_data)
        break;
    
      default:
        this.desc=check.desc(this.selected_data)
        console.log(this.desc)

        break;
    }
  }
  }
  show(){
    if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
    this.locService.setItem("selected_data",this.selected_data)
    this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selected_data.code+'/'+this.prestation])
  }

  
  showFileContract(el:any){
    
    var url=Config.toFile("storage/"+this.selected_data.code+"/"+el.file64);
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    console.log(url,this.pdfSrc)
    this.showPreview=true;
    this.observation="";
    this.selected_file=el;
    
      $('#cBtn').trigger('click');
      this.activeobsPanel=true;

  }
  showResponseFile(name:any){
    var url=Config.toFile("docs/responses/"+name);
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showResponseFilePreview=true;
    this.showPreview=true
    
    $('#cBtn').trigger('click');
  }
}
