import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../../../../core/services/project.service';
import { LocalStorageService } from '../../../../../core/utils/local-stoarge-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../../core/pipes/sample-search.pipe';
import { LoadingComponent } from '../../../../components/loading/loading.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
search_text:any=""

loading2=false
id:any
data:any
  requetes:any[]=[]

  pg={
    pageSize:10,
    p:1,
    total:0
  }
  
        constructor(
          private projectService:ProjectService,
          private route:ActivatedRoute,
           private locService:LocalStorageService,
          config: NgbModalConfig, 
          private modalService: NgbModal,
          private toastrService:ToastrService
        ){
          config.backdrop = 'static';
          config.keyboard = false;
        } 
    
      ngOnInit(): void {
         this.id= this.route.snapshot.paramMap.get('id')
         this.get();
      }
   
    
      get() {
        this.loading2=true;
        this.projectService.show(this.id).subscribe((res:any)=>{
          this.data=res.data
          this.requetes=this.data?.requetes
          this.loading2=false;  
  
        },
        (error:any)=>{
          
          this.loading2=false;
        })
      }

    getPage(event:any){
  this.pg.p=event
  }

  export(){
    
  }
}
