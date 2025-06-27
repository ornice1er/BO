import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { DashService } from '../../../../../core/services/dash.service';
import { LoadingComponent } from '../../../../components/loading/loading.component';

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
  loading2=false;

  constructor(private dashService:DashService, private route:ActivatedRoute){
    
  }

  ngOnInit(): void {
   this.slug= this.route.snapshot.paramMap.get('slug');
      this.all()
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



}
