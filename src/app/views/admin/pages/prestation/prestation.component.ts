import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityService } from '../../../../core/services/entity.service';
import { PrestationService } from '../../../../core/services/prestation.service';
import { UnityAdminService } from '../../../../core/services/unity_admin.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { NgToggleComponent } from 'ng-toggle-button';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'ngx-prestation',
  templateUrl: './prestation.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule,NgToggleComponent],
    
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  isDtInitialized:boolean = false
  selected_data:any
  user:any
  roles:any
  data:any[]=[]
  permissions:any[]=[]
  data2:any[]=[]
  data3:any[]=[]
  data4:any[]=[]
  loading=false
  loading2=false
  error:any=""
  buttonsPermission :any|undefined;
is_active=false
search_text:any=""
remoteSearchData: any[] = []
  pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
  public exampleData:any[]=[];
  public options: any;
  public value: any[]=[];
  selectedFilter = '';


      constructor(
        private unityAdminService:UnityAdminService,
        private prestationService:PrestationService,
        
         private locService:LocalStorageService,
        
        private entityService:EntityService,
        config: NgbModalConfig, private modalService: NgbModal,
        private toastrService:ToastrService
        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.roles=this.locService.get(GlobalName.role);
      this.all();
      this.getUnityAdmins()
      this.getEntities()
      this.getUnityAdminsAll()
      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };

      this.options = {
        width: '500',
        multiple: true,
        tags: true
      };
    }
    all() {
      this.loading2=true;
      this.prestationService.getAll().subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;

      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getUnityAdmins(){
      this.unityAdminService.getPrincipal().subscribe((res:any)=>{
        this.data2=res.data

       
      },
      (error:any)=>{
        
      })
    }
    getUnityAdminsAll(){
      this.unityAdminService.getAll().subscribe((res:any)=>{
        this.data4=res.data
        this.data4.forEach((el:any)=>{
          this.exampleData.push(  {
            id: el.id,
            text: el.libelle
          })
        });
      },
      (error:any)=>{
        
      })
    }
  
  
    checked(el:any){
      this.selected_data=el
    }
    getEntities(){
      this.entityService.getAll().subscribe((res:any)=>{
        this.data3=res.data
      },
      (error:any)=>{
        
      })
    }
    
    open(content:any) {
  
      this.modalService.open(
        content);
        
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
      this.loading=true;
        this.prestationService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
           this.modalService.dismissAll()
            this.all();
            this.toastrService.success("Enregistrement effectuée avec succès")

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any) {
    this.loading=true;
    console.log(value)
      this.prestationService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.modalService.dismissAll()
          this.all();
          this.toastrService.success("Modification effectuée avec succès")
  
      },
      (err:any)=>{
          this.loading=false;
      })
  
  }
  
  
  delete() {
      this.loading=true;
      if(confirm('Voulez vous supprimer cet élément')){
        this.prestationService.delete(this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          this.all();
          this.toastrService.success("Suppression effectuée avec succès")

      },
      (err:any)=>{
          this.loading=false;
      })
      }
  
  }

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.prestationService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.prestationService.search({search:this.search_text}).subscribe({
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
  
  hasPermission(permission:any){
    var check= this.permissions.find((e:any)=>e.name ==permission)
    if(check) return true;
    return false
  }

  getContentType(type:any){

    switch (type) {
      case 0:
          return "A éditer";
        break;
        case 1:
          return "A Charger";
        break;
        case 2:
          return "Pas de contenu";
        break;
    
      default:
          return "A éditer";
        break;
    }
  }

  addSP(value:any){
    this.loading=true
    this.prestationService.saveStartPoint(value).subscribe((res:any)=>{
      this.modalService.dismissAll()
      this.all()
      this.loading=false

    },
    (error:any)=>{
      this.loading=false

    })
  }
}
