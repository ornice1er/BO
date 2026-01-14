import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { EntityService } from '../../../../core/services/entity.service';
import { EntityTypeService } from '../../../../core/services/entity_type.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

@Component({
  selector: 'ngx-entity',
  templateUrl: './entity.component.html',
      standalone:true,
      imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  error:any=""
  buttonsPermission :any|undefined;
is_active=false
search_text:any=""
remoteSearchData: any[] = []
  selected_data:any
  user:any
  data:any[]=[]
  permissions:any[]=[]
  data2:any[]=[]
  loading=false
  loading2=false
    pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
         selectedFilter = '';


      constructor(private entityService:EntityService,private entitytypeService:EntityTypeService,
         private locService:LocalStorageService,
             private toastrService:ToastrService,
             private modalService: NgbModal
         
        ){
  
      } 
  
    ngOnInit(): void {
      this.all();
      this.getTypeEntity()
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
      this.entityService.getAll().subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    getTypeEntity(){
      this.entitytypeService.getAll().subscribe((res:any)=>{
        this.data2=res.data
      },
      (error:any)=>{
        
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
  
    store(value:any,ref:any) {
      this.loading=true;
        this.entityService.store(value).subscribe(
            (res:any)=>{
            this.loading=false;
            this.modalService.dismissAll()
            this.all();
            //MyToastr.make('success',"Entité","Enregistrement effectuté avec succès",this.toastrService)

        },
        (err:any)=>{
            this.loading=false;
        })
  
  }

  update(value:any,ref:any) {
    this.loading=true;
      this.entityService.update(value, this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
            this.modalService.dismissAll()
          this.all();
          //MyToastr.make('success',"Entité","Enregistrement effectuté avec succès",this.toastrService)

      },
      (err:any)=>{
          this.loading=false;
      })

}

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.entityService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.entityService.search({search:this.search_text}).subscribe({
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

  delete() {
    this.loading=true;
    if(confirm('Voulez vous supprimer cet élément')){
      this.entityService.delete(this.selected_data.id).subscribe(
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
}
