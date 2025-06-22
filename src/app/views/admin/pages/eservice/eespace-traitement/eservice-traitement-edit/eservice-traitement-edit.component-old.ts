import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AffectationService } from 'src/app/core/_services/affectation.service';
import { ResponseService } from 'src/app/core/_services/response.service';
import { MyToastr } from '../../../../../app.toastr';
import { RequeteService } from '../../../../../core/_services/requete.service';
import { LocalService } from '../../../../../core/_services/storage_services/local.service';
import { globalName } from '../../../../../core/_utils/utils';
import { PrestationDetails } from '../../prestation-details';
import * as $ from 'jquery'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Config } from 'src/app/app.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UnityAdminService } from 'src/app/core/_services/unity_admin.service';
import { PrestationService } from 'src/app/core/_services/prestation.service';
import { AlertNotif } from 'src/app/alert';
@Component({
  selector: 'ngx-eservice-traitement-edit',
  templateUrl: './eservice-traitement-edit.component.html',
  styleUrls: ['./eservice-traitement-edit.component.css']
})
export class EserviceTraitementEditComponent implements OnInit {
  selected_data:any
  user:any;
  selected_file:any
  prestation:any;
  reload=true
  code:any;
  desc=""
  permissions:any[]=[]
  responseUA={
    hasPermission:null,
    reason:"",
    motif:"",
    observation:"",
    unite_admin_id:"",
    requete_id:"",
    note:null,
    preview_file:null
  }
  isTreated=false
    loading=false
  fileUploaded:any
  doc_path:any
  btnShow="";
  transit=false;
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
  showPreview2=false;
    pdfSrc :SafeResourceUrl | undefined
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '500px',
      minHeight: '',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
   // upload: (file: File) => {  },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  myPrestation:any
  uas:any[]=[]

  constructor(
    private activatedRoute:ActivatedRoute,
    private locService:LocalService,
    private requeteService:RequeteService,
    private router:Router,
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private responseService:ResponseService,
    private toastrService:ToastrService,
    private affService:AffectationService,
    private _sanitizationService: DomSanitizer,
    private uaService:UnityAdminService,
    private prestationService:PrestationService

  ) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  prestationName:any
  responseUATreated={
    hasPermission:null,
    reason:"",
    motif:"",
    observation:"",
    unite_admin_id:"",
    requete_id:"",
    note:null,
    preview_file:null
  }
  responseUaCode:any

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.code=this.activatedRoute.snapshot.paramMap.get('code')
      this.prestation=this.activatedRoute.snapshot.paramMap.get('slug')
      this.user=this.locService.getItem(globalName.user);
      this.permissions=this.user.roles[0].permissions;
      this.myPrestation=this.user.userprestation.find((el:any)=>el.prestation.slug ==this.prestation).prestation
      this.responseUaCode=this.activatedRoute.snapshot.paramMap.get('isTreated')
      console.log(this.myPrestation)
     });  
     
     this.getName(this.prestation)
    this.get()
    this.getMyCollab()
  }

  getPrestation(){
    
  }
  get(){
    this.requeteService.get(this.code,this.prestation).subscribe((res:any)=>{
      this.selected_data=res.data
      this.docs[0].content=this.selected_data.content
      this.docs[1].content=this.selected_data.content2
      this.docs[2].content=this.selected_data.content3
      if(this.selected_data.reponses.length !=0){
        if(this.selected_data.reponses.length > 0) {
          if(this.responseUaCode==undefined){
            var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
            if(check) {
              
              console.log(check,"test ici")
              this.isTreated=true
              this.responseUA=check;
           // this.btnShow=this.responseUA.hasPermission.toString()
            }
          }else{
            this.responseUATreated= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.responseUaCode)
            this.responseUA.motif=this.responseUATreated.motif
            var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
            if(check) {
            
              this.isTreated=true
              this.responseUA=check;
            }
          }
           }
          }
     
      this.prepareDesc(this.selected_data)
    },
    (error:any)=>{
      
    })
  }

  getName(slug:any){
    let check=PrestationDetails.find((e:any)=> e.slug == slug);
    if (check) {
      this.prestationName=check.name
      this.doc_path=check.doc_path

    }
  }
  storeResponse(value:any){
    
    this.loading=true;
    this.responseUA.unite_admin_id=this.user.agent.unite_admin.id
    this.responseUA.requete_id=this.selected_data.id
    var formData=new FormData();
    formData.append('responseUA',JSON.stringify(this.responseUA))
    if(this.fileUploaded!=null){
      formData.append('file',this.fileUploaded) 
    }
    formData.append('requete_id',JSON.stringify(this.selected_data.id))
    if(this.prestation=='autorisation-de-stage'){
          formData.append('structure',value.structure)
    formData.append('service',value.service)
    formData.append('date_start',value.date_start)
    formData.append('date_end',value.date_end)
    }

    formData.append('prestation',this.prestation)

    console.log(value)
    
    this.requeteService.storeResponse(formData).subscribe(
        (res:any)=>{
        this.loading=false;
       var index= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
       if(index>=0){
        this.selected_data.reponses[index]=res
       }else{
        
        this.selected_data.reponses.push(res)
       }
        this.toastrService.success ("Projet de réponse","Votre avis a été enregistré")
        if(this.transit) {
          this.transUp()
        }
        else{
          this.transit=false

          this.isTreated=true
        }
      // if(!this.transit) this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selected_data.code+'/'+this.prestation])

    },
    (err:any)=>{
      this.transit=false

        this.loading=false;
        this.toastrService.error ("Veuillez contactee l'administrateur")

    })
  }
  upload(event:any){
    if(event.target.files.length >0){
    this.fileUploaded=event.target.files[0]
    }
  }

  back(){
    this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selected_data.code+'/'+this.prestation])
  }

  open(content:any) {
    this.modalService.open(content);
          
      }

      hasPermission(permission:any){
        var check= this.permissions.find((e:any)=>e.name ==permission)
        if(check) return true;
        return false
      }


      needCorrection(value?:any){
        if (this.selected_data==null) {
           this.toastrService.warning("Aucun élément selectionné");
          return ;
        }
        this.reload=false
        this.storeResponse(value)
        AlertNotif.finishConfirm("Voulez vous vraiment mettre en attente pour complément d'information cet enregistrement ?").then((result:any) =>{

    
            if (result.isConfirmed) {
              this.responseService.correction({
                requete_id:this.selected_data.id,
                commentaire:this.responseUA.motif
              
              }).subscribe(
                  (res:any)=>{
                  this.loading=false;
                  this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
                   this.toastrService.success(`La demande ${this.selected_data.code} a été suspendu avec succès`);
              },
              (err:any)=>{
                  this.loading=false;
                   this.toastrService.error("Opération échouée");
          
              })
            }
            }
          );
        
       
      }

      decline(value?:any){

        AlertNotif.finishConfirm("Voulez vous vraiment rejeter cette demande ?").then((result:any) =>{


          this.toastrService.info("Annulation en cours")
          this.reload=false
          if (result.isConfirmed) {
            this.storeResponse(value)

            this.loading=true;
            this.responseService.decline({
              prestation:this.prestation,
              prestation_name:this.prestationName,
              requete_id:this.selected_data.id,
              commentaire:this.responseUA.motif
            }).subscribe((res:any)=>{
              this.loading=false;
              this.selected_data=null;
              this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
              this.toastrService.success(`La demande de code ${this.selected_data.code} a été rejetée avec succès`)
  
            },
            (error:any)=>{
              
              this.loading=false;
              this.toastrService.error("Veuillez contactee l'administrateur")
  
            })
          }
             })
         
       }

       btnChange(event:any){
       
        if(this.responseUaCode !=undefined && event.target.value==1){
          this.responseUA.reason=this.responseUATreated.reason
        }
        console.log(this.btnShow)
       }

       tansUpStart(value:any){
        AlertNotif.finishConfirm("Voulez vous vraiment transmettre cette demande ?").then((result:any) =>{
          //console.log(result.isConfirmed);
          if(result.isConfirmed){
            this.transit=true
            $('#responseBtn').trigger('click')
          }
        });
       }
       transUp(){
        if (this.selected_data==null) {
           this.toastrService.warning("Aucun élément selectionné");
          return ;
        }
       // alert(this.transit)
        if(this.selected_data.reponses.length !=0 && !this.transit){
       //   alert()
          var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
          if(check == null) {
            this.toastrService.warning("`Votre projet de réponse est requis");
            return ;
          }
        }
        /*else{
          this.toastrService.warning("`Votre projet de réponse est requis");
          return ;
        }*/
        this.toastrService.info(`Opération en cours`)
     

        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          sens:-1
        }).subscribe(
            (res:any)=>{
            this.loading=false;
            this.transit=false
            this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])
            this.toastrService.info(`La demande ${this.selected_data.code} a été transmise avec succès`)
    
        },
        (err:any)=>{
            this.loading=false;
            this.toastrService.error("Opération échouée","Veuillez contactee l'administrateur")
    
        })

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
prepareDesc(el?:any){
  if (this.selected_data.content?.content !=null) {
    this.desc=this.selected_data.content
  } else {
     let data=this.selected_data;
  if(this.prestation=="attestation-de-stage") data=el;
  let check=PrestationDetails.find((e:any)=> e.slug == this.prestation);
  console.log(this.selected_data,check)
if (check) {
  if(this.selected_data.content != null){
    this.desc=this.selected_data.content 
  }else{
    this.desc=check.desc(data)
  }
  }
  }
 
}

showFile2(){
  if(this.selected_data==null){
    alert("Veuillez sélectionner une ligne !")
    return;
  }
 

  var url=Config.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
  this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
  this.showPreview2=true;
  
}

deliveryrDoc(){
  /* this.dialogService.open(DialogNamePromptComponent)
   .onClose.subscribe(result =>{
     if(result){*/
       var formData=new FormData()
       formData.append('content',this.desc)
       formData.append('currentDescId',this.currentDescId)
    if(this.fileUploaded)formData.append('file',this.fileUploaded)
       formData.append('id',JSON.stringify(this.selected_data.id))

       this.toastrService.info(`Opération en cours`)
     this.loading=true
       this.responseService.storeContent(formData).subscribe(
           (res:any)=>{
             this.toastrService.success(`L'attestation est prête à être délivrée`);
               var index2= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
       if(index2>=0){
        this.selected_data.reponses[index2]=res
       }
           this.loading=false;
           let index=this.docs.findIndex((el:any)=>el.id==parseInt(this.currentDescId))
       //    this.docs[index].content=value.contenu
           console.log(index,parseInt(this.currentDescId),this.docs)
               this.get()
       },
       (err:any)=>{
           this.loading=false;
            this.toastrService.error("Opération échouée");
   
       })
   //  }})
 
 }

 back2(){
  this.showPreview2=false;

}


delivered(){
  if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
    //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
    return ;
  }

 /* this.dialogService.open(DialogNamePromptComponent)
  .onClose.subscribe(result =>{
    if(result){*/

    this.toastrService.success("Autorisation en cours d'envoi")
      this.loading=true;
      this.responseService.store({
        prestation:this.prestation,
        prestation_name:this.prestationName,
        requete_id:this.selected_data.id
      }).subscribe((res:any)=>{
 
        this.loading=false;
        this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation])

        this.toastrService.success(`L'attestaion issue de la demande ${this.selected_data.code} a été envoyéee avec succès`)

      },
      (error:any)=>{
        this.selected_data=null
        this.loading=false;
        this.toastrService.error("Veuillez contactee l'administrateur")

      })
   // }})


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
       // this.selected_data=null
        this.loading=false;
        this.toastrService.error("Veuillez contactee l'administrateur")

    })


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

  showResponseFile(name:any){
    var url=Config.toFile("docs/responses/"+name);
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    console.log(this.pdfSrc)
    this.showPreview2=true
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
   
isSigner(){
  if(this.myPrestation.signer2.id == this.user.agent.unite_admin.id){
    return true;
    
  }else{
    return false;

  }
}
}
