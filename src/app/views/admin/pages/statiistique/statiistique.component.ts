import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Config } from 'src/app/app.config';
import { DashService } from 'src/app/core/_services/dash.service';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { globalName } from 'src/app/core/_utils/utils';


@Component({
  selector: 'app-statiistique',
  templateUrl: './statiistique.component.html',
  styleUrls: ['./statiistique.component.css']
})
export class StatiistiqueComponent implements OnInit {
  user:any
  userprestations:any[]=[]
  data:any
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
      // ⤵️ Fill the wrapper
      responsive: true,
      maintainAspectRatio: true,
      // ⤵️ Remove the main legend
      plugins: {
        legend: {
          display: true
        }
      }
  };

  constructor(
    private locService:LocalService,
    private dashService:DashService
  ) { }

  ngOnInit(): void {
    this.user=this.locService.getItem(globalName.user);
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data
      this.data.forEach((el:any)=>{
        this.chartData.push({
          label:el.name,
          data:el.stats_by_month,
          pointHitRadius: 15, // expands the hover 'detection' area
          pointHoverRadius: 8,
        })
      })
    
      this.chartLabels=res.months
    })
  }


  export(){

    let url= Config.toApiUrl('dash/stats/download/'+this.user.id)

    window.open(url, '_blank');
  }
  
}
