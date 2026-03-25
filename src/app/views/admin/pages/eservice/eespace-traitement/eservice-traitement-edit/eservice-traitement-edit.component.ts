import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
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
import { PdfViewerComponentComponent } from '../../../../../components/pdf-viewer-component/pdf-viewer-component.component';
import { ActionButtonsComponentComponent, ActionButtonsConfig } from '../../../../../components/action-buttons-component/action-buttons-component.component';
import { ResponseData, ResponseDisplayComponentComponent } from '../../../../../components/response-display-component/response-display-component.component';
import { DecisionData, DecisionFormComponent } from '../../../../../components/decision-form/decision-form.component';
import { WorkflowService } from '../../../../../../core/services/workflow.service';
@Component({
    selector: 'ngx-eservice-traitement-edit',
    templateUrl: './eservice-traitement-edit.component.html',
    standalone:true,
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        LoadingComponent,
        SampleSearchPipe,
        NgSelectModule,
        NgxPaginationModule,
        MatTooltipModule,
        AngularEditorModule,
        CommonModule,
        FormsModule,
        PdfViewerComponentComponent,
        ActionButtonsComponentComponent,
        DecisionFormComponent,
        LoadingComponent,
        ResponseDisplayComponentComponent,
        NgxExtendedPdfViewerModule,
    ],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./eservice-traitement-edit.component.css']
})
export class EserviceTraitementEditComponent implements OnInit {
  @ViewChild("pdfView") pdfView!: ElementRef<HTMLElement>;
  selectedData:any
  user:any;
  responseData:any={
    eps_id:"",
    observation:"",
  }
  currentResponse:any
  code:any
  prestation:any
  myPrestation:any
  permissions:any[]=[]
  uas:any[]=[]
  showPreview2=false;
  showResponseFilePreview=false;
  workflow:any
  loading=false
  fileUploaded:any
  fileUploaded2:any
   // pdfSrc :SafeResourceUrl | undefined
  pdfSrc2: SafeResourceUrl | undefined | string | null = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
  @ViewChild('contentPDF') contentPDF:TemplateRef<any> | undefined
  @ViewChild('contentFiche') contentFiche:TemplateRef<any> | undefined
pdfSrc: string | null = null;
rdvDate: string | null = null;
showAddingField={
  rdv:false,
  observation:false,
  note_file:false
}

  constructor(
    private activatedRoute:ActivatedRoute,
     private locService:LocalStorageService,
    private requeteService:RequeteService,
    private workflowService:WorkflowService,
    private router:Router,
    private modalService: NgbModal,
    private responseService:ResponseService,
    private toastrService:ToastrService,
    private affService:AffectationService,
    private _sanitizationService: DomSanitizer,
    private uaService:UnityAdminService,
    private prestationService:PrestationService,
        private offcanvasService: NgbOffcanvas,


  ) { 

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.code=this.activatedRoute.snapshot.paramMap.get('code')
      this.prestation=this.activatedRoute.snapshot.paramMap.get('slug')
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
      this.myPrestation=this.user.user_prestations.find((el:any)=>el.prestation.code ==this.prestation)?.prestation
     });  
     
    this.get()
    this.getMyCollab()
  }

  getWorkflow(){
     this.workflowService.getAll(this.selectedData.prestation_id,this.selectedData?.eps?.etape?.id).subscribe(
          (res:any)=>{
            if (res.data.length!=0) {
                      this.workflow=res.data[0]

            }
      },
      (err:any)=>{
          this.loading=false;
            this.toastrService.error("Opération échouée");
  
      })
  }

  showResponseFile(name:any,css='details-panel'){
       this.pdfSrc = `${ConfigService.toFile('storage')}/${name}`;
      this.offcanvasService.open(this.contentPDF,{  panelClass: css, position: 'start'  });

  }
   get(){
    this.requeteService.get(this.code,this.prestation,this.myPrestation?.code).subscribe((res:any)=>{
      this.selectedData=res.data
      this.getWorkflow()
    },
    (error:any)=>{
      
    })
  }

 
   storeResponse(value:any){
    this.loading=true;
    var formData=new FormData();
    for (const key in value) {
      if (!Object.hasOwn(value, key)) continue;
      
      const element = value[key];

      formData.append(key,element) 
    }
    if(this.fileUploaded!=null){
      formData.append('file',this.fileUploaded) 
    }
    if(this.fileUploaded2!=null){
      formData.append('filename',this.fileUploaded2) 
    }
    formData.append('requete_id',JSON.stringify(this.selectedData.id))
   
    formData.append('prestation',this.prestation)    
    this.responseService.store(formData).subscribe(
        (res:any)=>{  
          this.get()
          this.router.navigate(['/admin/eservice/espace-traitement-show/'+this.selectedData.code+'/'+this.myPrestation.code])
    },
    (err:any)=>{

        this.toastrService.error ("Veuillez contactee l'administrateur")

    })
  }

   updateResponse(value:any){
    this.loading=true;
    var formData=new FormData();
    for (const key in value) {
      if (!Object.hasOwn(value, key)) continue;
      
      const element = value[key];

      formData.append(key,element) 
    }
    if(this.fileUploaded!=null){
      formData.append('file',this.fileUploaded) 
    }
    if(this.fileUploaded2!=null){
      formData.append('filename',this.fileUploaded2) 
    }
    formData.append('requete_id',JSON.stringify(this.selectedData.id))
   
    formData.append('prestation',this.prestation)    
    this.responseService.update(this.currentResponse?.id,formData).subscribe(
        (res:any)=>{  
          this.get()

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
    }
    
  }

  openContract(filename:any){
    window.open(ConfigService.toFile('docs/responses/'+filename),'_blank')
  }
  back(){
    this.router.navigate(['admin/eservice/espace-traitement-show/'+this.selectedData.code+'/'+this.prestation])
  }

  open(content:any) {
    this.modalService.open(content);
          
      }

      hasPermission(permission:any){
        var check= this.permissions.find((e:any)=>e.name ==permission)
        if(check) return true;
        return false
      }


       tansUpStart(value:any){
        AppSweetAlert.confirmBox("Voulez vous vraiment transmettre cette demande ?").then((result:any) =>{
          //console.log(result.isConfirmed);
          if(result.isConfirmed){
           // $('#responseBtn').trigger('click')
          }
        });
       }
       transUp(){
        if (this.selectedData==null) {
           this.toastrService.warning("Aucun élément selectionné");
          return ;
        }
        this.loading=true;

        this.affService.store({
          requete_id:this.selectedData.id,
          unite_admin_id:this.user?.agent?.unite_admin?.id,
          sens:-1
        }).subscribe(
            (res:any)=>{
              this.loading=false;
              this.router.navigate(['admin/eservice/espace-traitement/'+this.prestation+'/'+this.myPrestation?.code])
              this.toastrService.info(`La demande ${this.selectedData.code} a été transmise avec succès`)
        },
        (err:any)=>{
          this.loading=false;

            this.toastrService.error("Opération échouée","Veuillez contactee l'administrateur")
    
        })

      }


    showFile2(){
      if(this.selectedData==null){
        alert("Veuillez sélectionner une ligne !")
        return;
      }
    

      this.pdfSrc2=this._sanitizationService.bypassSecurityTrustResourceUrl(this.selectedData.filename)
      this.showPreview2=true;
    }

 

    back2(){
      this.showPreview2=false;
      this.showResponseFilePreview=false;

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
      
   
    isSigner(){
      if(this.myPrestation?.signer == this.user?.agent?.unite_admin?.id){
        return true;
        
      }else{
        return false;

      }
    }

    generateMessage() {

  if(!this.rdvDate) return;

  const date = new Date(this.rdvDate);

  const dateFormat = date.toLocaleDateString();
  const heureFormat = date.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

  this.responseData.observation =
    `Votre entretien est programmé le ${dateFormat} à ${heureFormat}. 
     Merci de vous présenter à l'heure avec les pièces nécessaires.`;

}


checkShowAddingField(ev:any){
  switch (ev) {
    case 'rdv':
      this.showAddingField.rdv=true
      break;
  
       case 'observation':
       this.showAddingField.observation=true
      break;
       case 'note_file':
       this.showAddingField.note_file=true
      break;
      
    default:
      break;
  }
}


}


