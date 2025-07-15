import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { DashService } from '../../../../core/services/dash.service';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';


@Component({
  selector: 'app-statiistique',
  templateUrl: './statiistique.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./statiistique.component.css']
})
export class StatiistiqueComponent implements OnInit {
  user:any
  userprestations:any[]=[]
  data:any
  // chartData: ChartDataset[] = [];
  // chartLabels: string[] = [];
  // chartOptions: ChartOptions = {
  //     // ⤵️ Fill the wrapper
  //     responsive: true,
  //     maintainAspectRatio: true,
  //     // ⤵️ Remove the main legend
  //     plugins: {
  //       legend: {
  //         display: true
  //       }
  //     }
  // };

    pg={
    pageSize:10,
    p:1,
    total:0
  }
  loading=false
  is_active=false
  isPaginate=true
     search_text=""
  remoteSearchData: any[] = []
  selectedId: number | null = null;
  selected_data:any
  buttonsPermission :any|undefined;

  constructor(
     private locService:LocalStorageService,
         private toastrService:ToastrService,
     private modalService: NgbModal,
    private dashService:DashService
  ) { }

  ngOnInit(): void {
    this.user=this.locService.get(GlobalName.userName);
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data.data
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
      // this.data.forEach((el:any)=>{
      //   this.chartData.push({
      //     label:el.name,
      //     data:el.stats_by_month,
      //     pointHitRadius: 15, // expands the hover 'detection' area
      //     pointHoverRadius: 8,
      //   })
      // })
    
      // this.chartLabels=res.months
    })
  }

    setStatus(value:any){
  
      this.toastrService.warning("Opération en cours")
        this.loading=true
          this.dashService.setStatus(this.selected_data.id,value).subscribe((res:any)=>{
            this.toastrService.success(res.message)
            this.loading=false
           // this.all()
        },
        (err:any)=>{
          this.loading=false
          console.log(err)
            AppSweetAlert.simpleAlert("error","Gestion des utilisateurs",err.error.message)
        })
    }
  

   onSearchChange() {
  const localResults = this.data.filter((d:any)=> d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.dashService.search({search:this.search_text}).subscribe({
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
 // this.all(); // méthode pour recharger les données initiales
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


    getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
     // this.all();
    } else {
          this.pg.p=event
    }
  }

  export(){

    let url= ConfigService.toApiUrl('dash/stats/download/'+this.user.id)

    window.open(url, '_blank');
  }

  
  update(value:any,ref:any) {
    this.loading=true;
      this.dashService.update(value,this.selected_data.id).subscribe(
          (res:any)=>{
          this.loading=false;
          ref.close()
         // this.all();
          //MyToastr.make('success',"Type Unité Admin ","Modification effectuée avec succès",this.toastrService)

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
     // this.all();
      //MyToastr.make('success',"Type Unité Admin","Suppression de type entité",this.toastrService)
  },
  (err:any)=>{
      this.loading=false;
  })
  }

}
}
