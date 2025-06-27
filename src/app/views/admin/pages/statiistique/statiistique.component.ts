import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { DashService } from '../../../../core/services/dash.service';
import { ConfigService } from '../../../../core/utils/config-service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';


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

  constructor(
     private locService:LocalStorageService,
    private dashService:DashService
  ) { }

  ngOnInit(): void {
    this.user=this.locService.get(GlobalName.userName);
    this.dashService.getAll().subscribe((res:any)=>{
      this.data=res.data
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


  export(){

    let url= ConfigService.toApiUrl('dash/stats/download/'+this.user.id)

    window.open(url, '_blank');
  }
  
}
