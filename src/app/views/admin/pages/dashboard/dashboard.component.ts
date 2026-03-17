import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { DashService } from '../../../../core/services/dash.service';
import { AppErrorShow } from '../../../../core/utils/app-error-show';
import { CommonModule } from '@angular/common';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import {
  ChartDataset,
  ChartOptions,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}


@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, SampleSearchPipe, BaseChartDirective],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 user:any
  role:any
  user_prestations:any[]=[]
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
  currentPrestation:any

  constructor(
    private locService:LocalStorageService,
    private dashService:DashService
  ) { }
  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.user=this.locService.get(GlobalName.userName);
    this.role=this.user.roles[0].name
    this.user_prestations=this.user.user_prestations;
    this.currentPrestation=this.user_prestations[0]
    console.log(this.role)
    switch (this.role) {
      case 'Admin Sectoriel':
        this.dashService.get("admin").subscribe((res:any)=>{
          this.data=res.data.stats
        })
        break;
        case 'Admin national':
          this.dashService.get("admin").subscribe((res:any)=>{
            this.data=res.data.stats
          })
          break;
    
      default:
        this.dashService.get(this.user_prestations[0].prestation.code).subscribe((res:any)=>{
          this.data=res.data.stats
          this.chartData.push({
            label: this.user_prestations[0].prestation.name,
            data: res.data.stats_by_month,
            borderColor: '#0A3764',
            backgroundColor: 'rgba(10,55,100,0.08)',
            fill: true,
            pointBackgroundColor: '#0A3764',
            pointHitRadius: 15,
            pointHoverRadius: 7,
          })
          this.chartLabels=res.data.months
        })
        break;
    }
    
  }


  getNewStat(event:any){
    this.currentPrestation=this.user_prestations.find((el:any)=>el.prestation.code==event.target.value)?.prestation
    this.dashService.get(event.target.value).subscribe((res:any)=>{
      this.data=res.data.stats
      let index=this.chartData.findIndex((el:any)=>el.label ==this.user_prestations.find((el:any)=> el.prestation.code == event.target.value).prestation.name )
      if(index=-1){
        this.chartData.push({
          label:this.user_prestations.find((el:any)=> el.prestation.code == event.target.value).prestation.name,
          data:res.data.stats_by_month
        })
      }else{
        this.chartData[index].data=res.data.stats_by_month
        
      }
     
      this.chartLabels=res.data.months

    })
  }
}
