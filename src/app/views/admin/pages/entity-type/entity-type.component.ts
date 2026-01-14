import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModalConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityTypeService } from '../../../../core/services/entity_type.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'ngx-entity-type',
  templateUrl: './entity-type.component.html',
      standalone:true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  
  styleUrls: ['./entity-type.component.css']
})
export class EntityTypeComponent implements OnInit {
selected_data:any
data:any[]=[]
user:any
permissions:any[]=[]
loading=false
loading2=false
error:any=""
search_text:any=""
remoteSearchData: any[] = []
  pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
  buttonsPermission :any|undefined;
  is_active=false;
  selectedFilter = '';


    constructor(
          private toastrService:ToastrService,
      
      private entityTypeService:EntityTypeService,
      config: NgbModalConfig, private modalService: NgbModal,
       private locService:LocalStorageService,
      ){
        config.backdrop = 'static';
        config.keyboard = false;
    } 

  ngOnInit(): void {
    this.all();
    this.user=this.locService.get(GlobalName.userName);
    this.permissions=this.user.roles[0].permissions;
     this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  all() {
    this.loading2=true;
    this.entityTypeService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.loading2=false;
    },
    (error:any)=>{
      
      this.loading2=false;
    })
  }

  checked(el:any){
    this.selected_data=el
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
      this.entityTypeService.store(value).subscribe(
          (res:any)=>{
          this.loading=false;
        this.modalService.dismissAll()
          this.all();
          //MyToastr.make('success',"Type Entité","Enregistrement des types entités",this.toastrService)
      },
      (err:any)=>{
          this.loading=false;
      })

}

update(value:any) {
  this.loading=true;
  console.log(value)
    this.entityTypeService.update(value,this.selected_data.id).subscribe(
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
      this.entityTypeService.delete(this.selected_data.id).subscribe(
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

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.entityTypeService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.entityTypeService.search({search:this.search_text}).subscribe({
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

}
