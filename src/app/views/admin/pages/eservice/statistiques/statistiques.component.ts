import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { DashService } from '../../../../../core/services/dash.service';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { AppSweetAlert } from '../../../../../core/utils/app-sweet-alert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-statistiques',
  templateUrl: './statistiques.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  data:any;
  slug:any;
  selected_data:any;
  loading=false;
  is_active=false;
  loading2=false;
    pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
  buttonsPermission :any|undefined;
search_text:any=""
remoteSearchData: any[] = []

  constructor(
    private dashService:DashService, 
    private route:ActivatedRoute,            
    private modalService: NgbModal,
    private toastrService:ToastrService
    ){
    
  }

  ngOnInit(): void {
   this.slug= this.route.snapshot.paramMap.get('slug');
      this.all()
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
  }

  all() {
    this.loading2=true;
    this.dashService.show(this.slug).subscribe((res:any)=>{
      this.loading2=false;
     this.data=res.data;
     console.log(this.data)
    },
    (error:any)=>{
      this.loading2=false;
    })
  }
  loadStat(value:any) {
    this.loading2=true;
    console.log(value)
    this.dashService.update(value,this.slug).subscribe((res:any)=>{
      this.loading2=false;
     this.data=res.data;
     console.log(this.data)
    },
    (error:any)=>{
      this.loading2=false;
    })
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
  checked(el:any){
    this.selected_data=el
    console.log(this.selected_data)
  }


     store(value:any,ref:any) {
        this.loading=true;
          this.dashService.store(value).subscribe(
              (res:any)=>{
              this.loading=false;
              ref.close()
              this.all();
          },
          (err:any)=>{
              this.loading=false;
          })
    
    }
    update(value:any,ref:any) {
      this.loading=true;
        this.dashService.update(value,this.selected_data.id).subscribe(
            (res:any)=>{
            this.loading=false;
            ref.close()
            this.all();
            //MyToastr.make('success',"Gestion des agents ","Modification effectuée avec succès",this.toastrService)
  
        },
        (err:any)=>{
            this.loading=false;
        })
  
  }
  
  delete() {
    this.loading=true;
    if(confirm('Voulez vous supprimer cet élément')){
      this.dashService.delete(this.selected_data.id).subscribe(
        (res:any)=>{
        this.loading=false;
        this.all();
        //MyToastr.make('success',"Gestion des agents","Suppression de type entité",this.toastrService)
    },
    (err:any)=>{
        this.loading=false;
    })
    }
  
  }
  
    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.dashService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
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

  this.loading2 = true;

  this.dashService.search({search:this.search_text}).subscribe({
    next: (result:any) => {
      this.remoteSearchData = result.data;
      this.data = this.remoteSearchData;
      this.pg.p=1
      this.pg.total=this.data.length
      this.loading2 = false;
      console.log(this.remoteSearchData);
    },
    error: (err:any) => {
      console.error(err);
      this.loading2 = false;
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
