import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { PrestationService } from '../../../../../core/services/prestation.service';
import { LocalStorageService } from '../../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../../components/loading/loading.component';

@Component({
  selector: 'ngx-prestation-details',
  templateUrl: './prestation-details.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./prestation-details.component.css']
})
export class PrestationDetailsComponent implements OnInit {
slug:any;
desc:any;

  constructor(
    private activatedRoute:ActivatedRoute ,
         private locService:LocalStorageService,
        private prestationService:PrestationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
   
      this.slug=this.activatedRoute.snapshot.paramMap.get('slug')
      this.init()
      
     });  
  }

  init(){
    this.prestationService.show(this.slug).subscribe((res:any)=>{
    
    },
    (error:any)=>{
      
      console.log(error)
    })
  }

}
