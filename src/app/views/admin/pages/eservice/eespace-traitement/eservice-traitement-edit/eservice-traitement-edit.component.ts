import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../../../core/pipes/sample-search.pipe';
import { AffectationService } from '../../../../../../core/services/affectation.service';
import { PrestationService } from '../../../../../../core/services/prestation.service';
import { RequeteService } from '../../../../../../core/services/requete.service';
import { ResponseService } from '../../../../../../core/services/response.service';
import { UnityAdminService } from '../../../../../../core/services/unity_admin.service';
import { GlobalName } from '../../../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../../../components/loading/loading.component';
import { PrestationDetails } from '../../prestation-details';
import { ConfigService } from '../../../../../../core/utils/config-service';
import { AppSweetAlert } from '../../../../../../core/utils/app-sweet-alert';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
@Component({
  selector: 'ngx-eservice-traitement-edit',
  templateUrl: './eservice-traitement-edit.component.html',
      standalone:true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule,AngularEditorModule ],
  
  styleUrls: ['./eservice-traitement-edit.component.css']
})
export class EserviceTraitementEditComponent implements OnInit {
  @ViewChild("pdfView") pdfView!: ElementRef<HTMLElement>;
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
  fileUploaded2:any
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
  showResponseFilePreview=false;

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
  contractFiles:any[]=[]
  storeResponseActionState=false
  genActionState=false
  transUpActionState=false
  needActionState=false
  rejetActionState=false

  constructor(
    private activatedRoute:ActivatedRoute,
     private locService:LocalStorageService,
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
      this.user=this.locService.get(GlobalName.userName);
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
    this.requeteService.get(this.code,this.prestation,this.myPrestation.code).subscribe((res:any)=>{
      this.selected_data=res.data
      this.docs[0].content=this.selected_data.content
      this.docs[1].content=this.selected_data.content2
      this.docs[2].content=this.selected_data.content3
      this.getDetailsFiles()
      if(this.selected_data.reponses.length !=0){
        if(this.selected_data.reponses.length > 0) {
          if(this.responseUaCode==undefined){
            var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
            if(check) {

             // this.showFile2()

              console.log(check,"test ici")
              this.isTreated=true
              this.responseUA=check;
           // this.btnShow=this.responseUA.hasPermission.toString()
         
           if (this.responseUA.hasPermission==1) {
            this.showFile2()
          }
            }
          }else{
         
            this.responseUATreated= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.responseUaCode)
            this.responseUA.motif=this.responseUATreated.motif
            var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
            
            if(check) {

           

              this.isTreated=true
              this.responseUA=check;
              if (this.responseUA.hasPermission==1) {
                this.showFile2()
              }
            }else{
              if (this.responseUATreated.hasPermission==1) {
                this.showFile2()
              }
            }
          }
          
        
          
           }
          }
     
      this.prepareDesc(this.selected_data)
          if (this.genActionState) {
            this.showFile2()
            this.genActionState=false
          }
          this.needActionState=false
          this.rejetActionState=false
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
    if(this.fileUploaded2!=null){
      formData.append('filename',this.fileUploaded2) 
    }
    formData.append('requete_id',JSON.stringify(this.selected_data.id))
    if(this.prestation=='autorisation-de-stage'){
          formData.append('structure',value.structure)
    formData.append('service',value.service)
    formData.append('date_start',value.date_start)
    formData.append('date_end',value.date_end)
    }
    if(this.prestation=='attestation-de-presence-au-poste'){
    formData.append('status',value.status)
    formData.append('sex',value.sex)
    formData.append('corporate',value.corporate)
    formData.append('category',value.category)
    formData.append('scale',value.scale)
    formData.append('level',value.level)
    formData.append('birthday',value.birthday)
    formData.append('birthplace',value.birthplace)
    }

    formData.append('prestation',this.prestation)    
    this.requeteService.storeResponse(formData).subscribe(
        (res:any)=>{

          if (this.genActionState) {
            this.deliveryrDoc()
          }else if (this.needActionState) {
           
            this.needCorrection()
          }else if (this.rejetActionState) {
            this.decline()
          }else  if(this.transUpActionState){
            this.transUp()
          }else
          
          
          {
            this.toastrService.success("Avis","Votre avis a été sauvegardé")

            this.get()
            this.pdfView.nativeElement.scrollIntoView()
            this.loading=false;

          }
      // if(!this.transit) this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selected_data.code+'/'+this.prestation])

    },
    (err:any)=>{

        this.toastrService.error ("Veuillez contactee l'administrateur")

    })
  }
  upload(event:any){
    if(event.target.files.length >0){
    this.fileUploaded=event.target.files[0]
    }
  }
  upload2(event:any,index:any,name:any){
    if(event.target.files.length >0){
    this.fileUploaded2=event.target.files[0]

    let formData = new FormData()
      formData.append('file',this.fileUploaded2)
      formData.append('code',this.selected_data.code)
      formData.append('index',index)
      formData.append('name',index)
      
      this.requeteService.addContratFile(formData).subscribe(
        (res:any)=>{
          this.contractFiles[index].has_contract=true
          this.contractFiles[index].file.file=res.data
      })
    }
    
  }

  openContract(filename:any){
    window.open(ConfigService.toFile('docs/responses/'+filename),'_blank')
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
     //   this.storeResponse(value)
        AppSweetAlert.confirmBox("Voulez vous vraiment mettre en attente pour complément d'information cet enregistrement ?").then((result:any) =>{

    
            if (result.isConfirmed) {
              this.responseService.correction({
                requete_id:this.selected_data.id,
                commentaire:this.responseUA.motif
              
              }).subscribe(
                  (res:any)=>{
                  this.loading=false;
                  this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation+'/'+this.code])
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

        AppSweetAlert.confirmBox("Voulez vous vraiment rejeter cette demande ?").then((result:any) =>{


          this.toastrService.info("Annulation en cours")
          this.reload=false
          if (result.isConfirmed) {
        //    this.storeResponse(value)

            this.loading=true;
            this.responseService.decline({
              prestation:this.prestation,
              prestation_name:this.prestationName,
              requete_id:this.selected_data.id,
              commentaire:this.responseUA.motif
            }).subscribe((res:any)=>{
              this.loading=false;
              this.selected_data=null;
              this.toastrService.info("Demandes rejetées")
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
        AppSweetAlert.confirmBox("Voulez vous vraiment transmettre cette demande ?").then((result:any) =>{
          //console.log(result.isConfirmed);
          if(result.isConfirmed){
            this.transit=true
           // $('#responseBtn').trigger('click')
          }
        });
       }
       transUp(){
        if (this.selected_data==null) {
           this.toastrService.warning("Aucun élément selectionné");
          return ;
        }
        this.loading=true;

        this.affService.store({
          requete_id:this.selected_data.id,
          unite_admin_id:this.user.agent.unite_admin.id,
          sens:-1
        }).subscribe(
            (res:any)=>{
              this.loading=false;
              this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation+'/'+this.myPrestation.code])
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
    

      var url=ConfigService.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
      this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
      this.showPreview2=true;
      console.log(url)
    }

     deliveryrDoc(){
      this.loading=true;

          var formData=new FormData()
          formData.append('content',this.desc)
          formData.append('currentDescId',this.currentDescId)
        if(this.fileUploaded)formData.append('file',this.fileUploaded)
          formData.append('id',JSON.stringify(this.selected_data.id))
          this.responseService.storeContent(formData).subscribe(
              (res:any)=>{
                  var index2= this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
                  if(index2>=0){
                    this.selected_data.reponses[index2]=res
                  }
                  this.toastrService.success("Avis","Votre avis a été sauvegardé et le document mis à jour")

              this.loading=false;
              let index=this.docs.findIndex((el:any)=>el.id==parseInt(this.currentDescId))
              this.get()
              this.pdfView.nativeElement.scrollIntoView()
          },
          (err:any)=>{
                this.toastrService.error("Opération échouée");
      
          })

    
    }

    back2(){
      this.showPreview2=false;
      this.showResponseFilePreview=false;

    }


    delivered(){
    /*  if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
        //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
        return ;
      }*/

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
            this.router.navigate(['admin/eservice/espace-signature/'+this.prestation+'/'+this.myPrestation.code])

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
     /* if (this.prestation == 'autorisation-de-stage' && (this.selected_data.content == null || this.selected_data.content2 == null || this.selected_data.content3 == null )) {
        //MyToastr.make('danger',"Opération échouée","Les contenus livrables des trois types de documents sont requis! ",this.toastrService)
        return ;
      }*/
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
        var url=ConfigService.toFile("docs/responses/"+name);
        this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
        console.log(this.pdfSrc)
        this.showResponseFilePreview=true
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

    getDetailsFiles(){
     if(this.selected_data.details) this.contractFiles= JSON.parse(this.selected_data.details).list
    }

 stepAction(value:any){
  console.log(value);

  this.loading=true
  this.toastrService.info("Opération en cours",'Info')
  if (this.responseUA.hasPermission==1 && !this.isTreated) {
    if (this.myPrestation.content_type==0 && this.selected_data.content != this.desc) {
         this.genActionState=true
    }else if(this.myPrestation.content_type==2 && this.selected_data.file== null && this.myPrestation.from_pns){

      this.genActionState=true

    }
    
    this.storeResponse(value)

  }else   if (this.responseUA.hasPermission==1 && this.isTreated) {
    if (this.myPrestation.content_type==0 && this.selected_data.content != this.desc) {
      this.genActionState=true
    }else if(this.myPrestation.content_type==2 && this.selected_data.file== null && this.myPrestation.from_pns){
      this.genActionState=true

    }
    this.storeResponse(value)

  }else  if (this.responseUA.hasPermission==2) {
    if (this.hasPermission('suspension')) {
    
      this.needActionState=true
    }
    this.storeResponse(value)
  }else  if (this.responseUA.hasPermission==0) {
    if (this.hasPermission('rejet')) {
      this.rejetActionState=true
    }else{
      this.transUpActionState=true
    }
    this.storeResponse(value)
  }

  this.loading=false
}
getText(){
  if (this.responseUA.hasPermission==1  && !this.isSigner() && !this.isTreated){
    return "Enregistrer mon avis"
  }else   if (this.responseUA.hasPermission==1  && !this.isSigner() && this.isTreated){
    return "Modifier mon avis"
  }else  if((this.responseUA.hasPermission==1 || this.responseUA.hasPermission==0 || this.responseUA.hasPermission==2)  && this.isSigner()){
    return "Confirmer ma décision finale" 
  }else  if(this.responseUA.hasPermission==2  && !this.isSigner() && this.hasPermission('suspension') ){
    return "Mettre en attente la demande" 
  }else  if(this.responseUA.hasPermission==2  && !this.isSigner() && !this.hasPermission('suspension') ){
    return "Soumettre mon avis" 
  }else if(this.responseUA.hasPermission==0  && !this.isSigner() && this.hasPermission('rejet') ){
    return "Rejeter la demande" 
  }else  if(this.responseUA.hasPermission==0  && !this.isSigner() && !this.hasPermission('rejet') ){
    return "Soumettre mon avis" 
  }{
    return "Soumettre"
  }
}
}


