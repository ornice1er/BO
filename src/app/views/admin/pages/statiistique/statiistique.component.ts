import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import {} from '../../../../core/pipes/sample-search.pipe';
import { DashService } from '../../../../core/services/dash.service';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import {} from '../../../components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import {
  ChartDataset,
  ChartOptions,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-statiistique',
    templateUrl: './statiistique.component.html',
    imports: [CommonModule, FormsModule, NgbModule, NgSelectModule, NgxPaginationModule, MatTooltipModule, BaseChartDirective],
    styleUrls: ['./statiistique.component.css']
})
export class StatiistiqueComponent implements OnInit {
  user:any
  userprestations:any[]=[]
  data:any
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { usePointStyle: true, padding: 20, font: { size: 12 } }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: { grid: { color: '#f0f2f5' }, border: { display: false }, beginAtZero: true }
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2 },
      point: { radius: 4, hoverRadius: 7 }
    }
  };

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
    const PALETTE = [
      { border:'#0A3764', bg:'rgba(10,55,100,0.08)' },
      { border:'#1F883F', bg:'rgba(31,136,63,0.08)' },
      { border:'#4f46e5', bg:'rgba(79,70,229,0.08)' },
      { border:'#0d9488', bg:'rgba(13,148,136,0.08)' },
      { border:'#ea580c', bg:'rgba(234,88,12,0.08)' },
      { border:'#9333ea', bg:'rgba(147,51,234,0.08)' }];
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data.data
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
      this.data.forEach((el:any, i:number)=>{
        const c = PALETTE[i % PALETTE.length];
        this.chartData.push({
          label: el.name,
          data: el.stats_by_month,
          borderColor: c.border,
          backgroundColor: c.bg,
          pointBackgroundColor: c.border,
          fill: true,
          pointHitRadius: 15,
          pointHoverRadius: 7,
        })
      })
    
      this.chartLabels=res.data?.months
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
            AppErrorShow.showError("Opération échouée", err)
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
