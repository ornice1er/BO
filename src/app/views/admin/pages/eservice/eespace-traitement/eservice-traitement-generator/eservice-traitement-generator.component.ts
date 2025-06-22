import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MyToastr } from '../../../../../app.toastr';
import { AffectationService } from '../../../../../core/_services/affectation.service';
import { RequeteService } from '../../../../../core/_services/requete.service';
import { ResponseService } from '../../../../../core/_services/response.service';
import { LocalService } from '../../../../../core/_services/storage_services/local.service';
import { globalName } from '../../../../../core/_utils/utils';
import { PrestationDetails } from '../../prestation-details';
import { Config } from '../../../../../app.config';
import { DialogNamePromptComponent } from 'src/app/admin/dialog-name-prompt/dialog-name-prompt.component';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-eservice-traitement-generator',
  templateUrl: './eservice-traitement-generator.component.html',
  styleUrls: ['./eservice-traitement-generator.component.css']
})
export class EserviceTraitementGeneratorComponent implements OnInit {
selected_data:any
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
user:any;
selected_file:any
prestation:any;
code:any;
permissions:any[]=[]
desc=""
doc_path:any
showPreview2=false;
  pdfSrc :SafeResourceUrl | undefined
prestationName:any;
myPrestation:any;
isTreated=false
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
  constructor(
    private activatedRoute:ActivatedRoute,
    private locService:LocalService,
    private requeteService:RequeteService,
    private _sanitizationService: DomSanitizer,
    private router:Router,
    private toastrService:ToastrService,
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
      this.code=this.activatedRoute.snapshot.paramMap.get('code')
      this.prestation=this.activatedRoute.snapshot.paramMap.get('slug')
      this.user=this.locService.getItem(globalName.user);
      this.permissions=this.user.roles[0].permissions;
      this.myPrestation=this.user.userprestation.find((el:any)=>el.prestation.slug ==this.prestation).prestation

     });  
    this.selected_data=this.locService.getItem('selected_data')
    this.docs[0].content=this.selected_data.content
    this.docs[1].content=this.selected_data.content2
    this.docs[2].content=this.selected_data.content3

    this.prepareDesc(this.selected_data)
    this.getName(this.prestation)
    this.get()
  }

  get(){
    this.requeteService.get(this.code,this.prestation).subscribe((res:any)=>{
      this.selected_data=res.data
      if(this.selected_data.reponses.length !=0){
        if(this.selected_data.reponses.length > 0) {
          var check=this.selected_data.reponses.find((e:any)=> e.unite_admin_id ==this.user.agent.unite_admin.id)
          if(check) {
            this.isTreated=true
          }else if(this.user.roles[0].name="Directeur"){
            this.isTreated=true

          }
           }
          }      
    },
    (error:any)=>{
      
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
  prepareDesc(el?:any){
    if (this.selected_data?.content !=null) {
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

  showFile2(){
    if(this.selected_data==null){
      alert("Veuillez sélectionner une ligne !")
      return;
    }
   

    var url=Config.toFile(this.doc_path)+"/"+this.selected_data.code+"/"+this.selected_data.filename;
    this.pdfSrc=this._sanitizationService.bypassSecurityTrustResourceUrl(url)
    this.showPreview2=true;
    
  }

  open(content:any) {
    this.modalService.open(content)
      
  }
  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  back(){
    this.showPreview2=false;

  }

  back2(){
    this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selected_data.code+'/'+this.prestation])
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
       //   this.selected_data=null
          this.loading=false;
          this.toastrService.error("Veuillez contactee l'administrateur")

      })
  
 
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


getName(slug:any){
  let check=PrestationDetails.find((e:any)=> e.slug == slug);
  if (check) {
    this.prestationName=check.name
    this.doc_path=check.doc_path
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

isSigner(){
  if(this.myPrestation.signer2.id == this.user.agent.unite_admin.id){
    return true;
    
  }else{
    return false;

  }
}

}
