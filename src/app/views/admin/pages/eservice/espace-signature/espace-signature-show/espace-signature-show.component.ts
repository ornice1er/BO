import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PrestationDetails } from '../../prestation-details';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { AffectationService } from '../../../../../../core/services/affectation.service';
import { RequeteService } from '../../../../../../core/services/requete.service';
import { ResponseService } from '../../../../../../core/services/response.service';
import { UnityAdminService } from '../../../../../../core/services/unity_admin.service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../../../components/loading/loading.component';

@Component({
  selector: 'app-espace-signature-show',
  templateUrl: './espace-signature-show.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./espace-signature-show.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class EspaceSignatureShowComponent implements OnInit {

  selected_data:any
  user:any;
  selected_file:any
  prestation:any;
  code:any;
  fileUploaded:any;
  prestationName:any
  isTreated=false
  isMyTreated=false
  permissions:any[]=[]
  doc_path:any
  showPreview2=false;
  showPreview=false;
  showResponseFilePreview=false;
    pdfSrc :SafeResourceUrl | undefined | undefined
  activeobsPanel=false
  observation:any
  responseUA={
    hasPermission:null,
    reason:"",
    observation:"",
    unite_admin_id:"",
    requete_id:""
  }
  currentDescId:any=0
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
  loading=false
  uas:any[]=[]
  myPrestation:any;

  constructor(
    private activatedRoute:ActivatedRoute,
     private locService:LocalStorageService,
    private requeteService:RequeteService,
    private _sanitizationService: DomSanitizer,
    private router:Router,
    private toastrService:ToastrService,
    private uaService:UnityAdminService,
    private affService:AffectationService,
    private responseService:ResponseService,
    config: NgbModalConfig, private modalService: NgbModal

  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.selected_data=null
      this.fileUploaded=null
      this.code=this.activatedRoute.snapshot.paramMap.get('code')
      this.prestation=this.activatedRoute.snapshot.paramMap.get('slug')
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
      this.myPrestation=this.user.user_prestations.find((el:any)=>el.prestation.code==this.prestation).prestation
      this.getName(this.prestation);
     });  
     
     this.locService.remove('curreent_response')
     this.get()
     this.getMyCollab()
  }
  getName(slug:any){
    let check=PrestationDetails.find((e:any)=> e.slug == slug);
    if (check) {
      this.prestationName=check.name
      this.doc_path=check.doc_path
    }
  }
  get(){
    this.requeteService.get(this.code,this.prestation).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.selected_data=res.data
     if(this.selected_data.reponses.length > 0) {
      this.responseUA= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
      this.isTreated=true
        if( this.responseUA){
          this.isMyTreated=true
        }else{
          this.responseUA= this.selected_data.reponses.find((e:any)=> e.unite_admin.ua_parent_code ==this.user.agent.unite_admin.id)
          console.log("orceeeeeeeeeee",this.responseUA,this.user.agent.unite_admin.id)
        }
      }
      this.showFile2()
    },
    (error:any)=>{
      
    })
  }

  showFile(el:any){
    var url=ConfigService.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+el.filename;
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview=true;
    this.observation="";
    this.selected_file=el;
    
      this.activeobsPanel=true;

  }
  showResponseFile(name:any){
    var url=ConfigService.toFile("docs/responses/"+name);
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showResponseFilePreview=true;
    this.showPreview=true
    
   // $('#cBtn').trigger('click');
  }

  showFile2(){
    if(this.selected_data==null){
      alert("Veuillez sélectionner une ligne !")
      return;
    }

    var url=ConfigService.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview2=true;

  }

  open(content:any) {
this.modalService.open(content);
      
  }

  open2(){
    this.locService.set("selected_data",this.selected_data)
    if(this.isTreated && !this.isMyTreated){
      this.router.navigate(['admin/eservice/espace-traitement-edit/'+this.selected_data.code+'/'+this.prestation+'/'+this.responseUA.unite_admin_id])

    }else{
      this.router.navigate(['admin/eservice/espace-traitement-edit/'+this.selected_data.code+'/'+this.prestation])

    }

  }
  open3(){
    if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
  
        if(this.selected_data.reponses.length !=0){
          if (this.user.roles[0].name!= "Directeur") {
      var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
      if(check == null) {
        this.toastrService.warning("`Votre projet de réponse est requis");
        return ;
      }
    } 

    }else{
      this.toastrService.warning("`Votre projet de réponse est requis");
      return ;
    }
    
    this.router.navigate(['admin/eservice/espace-traitement-generation-doc/'+this.selected_data.code+'/'+this.prestation])

  }

  transDown(value:any){
   let d2 = formatDate(new Date(),'yyyy-MM-dd','en_US');
   let d1 =formatDate(value.delay,'yyyy-MM-dd','en_US');
   let dayOfWeek =new Date(value.delay).getDay();

   
    if(d1 < d2){

      this.toastrService.error(`Veuillez choisir une date ultérieure `)
      return ;
    }
    if(dayOfWeek===6 || dayOfWeek===0){

      this.toastrService.error(`Veuillez choisir une date de jour ouvré `)
      return ;
    }



    this.modalService.dismissAll()

    AppSweetAlert.confirmBox("Voulez vous vraiment affecter/retourner cet enregistrement ?").then((result:any) =>{
      if(result.isConfirmed){
        this.toastrService.info("Opération en cours")

        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          unite_admin_down_id:value.ua_down_id,
          sens:1,
          instruction:value.instruction,
          delay:value.delay,
        }).subscribe(
            (res:any)=>{
               this.toastrService.success(`La demande ${this.selected_data.code} a été affectée avec succès`);
              this.router.navigate(['/admin/eservice/espace-traitement/'+this.prestation])
        },
        (err:any)=>{
          this.toastrService.error("Veuillez contactee l'administrateur")
    
        })
      }})
  
  }
  needCorrection(value:any){
    if (this.selected_data==null) {
       this.toastrService.warning("Aucun élément selectionné");
      return ;
    }
     /* this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(result =>{
        if(result){*/
          //MyToastr.make('info',"Demande de correction",`Opération en cours`,this.toastrService)

          this.responseService.correction({
            requete_id:this.selected_data.id,
            commentaire:value.commentaire
          
          }).subscribe(
              (res:any)=>{
              this.loading=false;
              this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
               this.toastrService.success("La demande ${this.selected_data.code} a été suspension avec succès");
          },
          (err:any)=>{
              this.loading=false;
               this.toastrService.error("Opération échouée");
      
          })
     //   }
     // });
    
   
  }
  sendReachedAgreement(){
 
      /*this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(result =>{
        if(result){*/
          //MyToastr.make('info',"Suspension pour accord à l'amiable",`Opération en cours`,this.toastrService)

          this.responseService.reachedAgreement({
            requete_id:this.selected_data.id
          
          }).subscribe(
              (res:any)=>{
              this.loading=false;
              this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
             
              this.selected_data=null;
              //MyToastr.make('success',"Suspension pour accord à l'amiable",`La demande ${this.selected_data.code} a été suspension avec succès`,this.toastrService)
      
          },
          (err:any)=>{
              this.loading=false;
               this.toastrService.error("Opération échouée");
      
          })
   //     }
  //    });
    
   
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

    AppSweetAlert.confirmBox("Voulez vous vraiment transmettre cet enregistrement ?").then((result:any) =>{
      if(result.isConfirmed){
        this.toastrService.info("Opération en cours")
        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          sens:-1
        }).subscribe(
            (res:any)=>{
            this.loading=false;
            this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
            this.toastrService.info(`La demande ${this.selected_data.code} a été transmise avec succès`)
    
        },
        (err:any)=>{
            this.loading=false;
            this.toastrService.error("Veuillez contactee l'administrateur")
    
        })
      }
    });
   
  }
  decline(value:any){
    if(confirm("Envoyer le mail de rejet")){
           //MyToastr.make('info',"Opération encours","Annulation en cours",this.toastrService)
           this.loading=true;
           this.responseService.decline({
             prestation:this.prestation,
             prestation_name:this.prestationName,
             requete_id:this.selected_data.id,
             commentaire:value.commentaire
           }).subscribe((res:any)=>{
             this.loading=false;
             this.selected_data=null;
             this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
             //MyToastr.make('success',"Rejet de demande",`La demande de code ${this.selected_data.code} a été rejetée avec succès`,this.toastrService)
 
           },
           (error:any)=>{
             
             this.loading=false;
             //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)
 
           })
         }
     
   }
   validate(){
    if(confirm("Envoyer le mail de validation")){
           //MyToastr.make('info',"Opération encours","Annulation en cours",this.toastrService)
           this.loading=true;
           this.responseService.validate({
             prestation:this.prestation,
             prestation_name:this.prestationName,
             requete_id:this.selected_data.id,
             commentaire:""
           }).subscribe((res:any)=>{
             this.loading=false;
             this.selected_data=null;
             this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
             //MyToastr.make('success',"Rejet de demande",`La demande de code ${this.selected_data.code} a été rejetée avec succès`,this.toastrService)
 
           },
           (error:any)=>{
             
             this.loading=false;
             //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)
 
           })
         }
     
   }
  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  storeAmend(){
    this.responseUA.observation=`Les observations suivantes sont à prendre en compte sur le fichier suivant ${this.selected_file.filename}: \n ${this.observation} \n`
    this.locService.set("curreent_response",this.responseUA.toString())
    this.activeobsPanel=true
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
    /*this.windowService.open(
      contentTemplate,{title:"Elaboration d'un projet de réponse"}
    );*/
    
  }
  back(){
    this.showPreview=false;
    this.showResponseFilePreview=false;
  }

  back2(){
  /*  this._location.back();
   if( this.myPrestation.start_point.id == this.user.agent.unite_admin.id){
  this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
   }else{
  this.router.navigate(['admin/eservice/espace-validation/'+this.prestation])
   }*/
   this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])


  }

  delivered(){
    if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
      //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
      return ;
    }

   /* this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(result =>{
      if(result){*/
  
      this.toastrService.info("Documen en cours d'envoi")
        this.loading=true;
  
        this.responseService.store({
          prestation:this.prestation,
          prestation_name:this.prestationName,
          requete_id:this.selected_data.id
        }).subscribe((res:any)=>{
   
          this.loading=false;
          this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])

          //MyToastr.make('success',"Envoi d'attestation",`L'attestaion issue de la demande ${this.selected_data.code} a été envoyéee avec succès`,this.toastrService)

        },
        (error:any)=>{
          this.selected_data=null
          this.loading=false;
          //MyToastr.make('danger',"Opération échouée","Veuillez contactee l'administrateur",this.toastrService)

        })
     // }})
  
 
}
back3(){
  this.showPreview2=false;

}

getMyCollab(){
  this.uaService.getUaCollabs().subscribe((res:any)=>{
    this.loading=false;
   this.modalService.dismissAll()
    this.uas=res
    console.log(res)
  },
  (error:any)=>{
    this.toastrService.error("Veuillez contactee l'administrateur")

})

}

deliveryrDoc(value:any){
  /* this.dialogService.open(DialogNamePromptComponent)
   .onClose.subscribe(result =>{
     if(result){*/
       var formData=new FormData()
       formData.append('content',value.desc)
       formData.append('currentDescId',this.currentDescId)
       formData.append('id',JSON.stringify(this.selected_data.id))

       this.toastrService.info(`Opération en cours`)
     this.loading=true
       this.responseService.storeContent(formData).subscribe(
           (res:any)=>{
             this.toastrService.success(`L'attestation est prête à être délivrée`);
           this.loading=false;
           let index=this.docs.findIndex((el:any)=>el.id==parseInt(this.currentDescId))
           this.docs[index].content=value.contenu
           console.log(index,parseInt(this.currentDescId),this.docs)
               this.get()
       },
       (err:any)=>{
           this.loading=false;
            this.toastrService.error("Opération échouée");
   
       })
   //  }})
 
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
       this.modalService.dismissAll()

        this.get()
        
        this.toastrService.success(`Signature autorisée`)

      },
      (error:any)=>{
      //  this.selected_data=null
        this.loading=false;
        this.toastrService.error("Veuillez contacter l'administrateur")

    })


}


isSigner(){
  if(this.myPrestation.signer2.id == this.user.agent.unite_admin.id){
    return true;
    
  }else{
    return false;

  }
}
}
