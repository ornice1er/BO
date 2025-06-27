import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SampleSearchPipe } from '../../../../core/pipes/sample-search.pipe';
import { BillingService } from '../../../../core/services/billing.service';
import { GlobalName } from '../../../../core/utils/global-name';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { LoadingComponent } from '../../../components/loading/loading.component';

@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.component.html',
        standalone:true,
        imports:[CommonModule,FormsModule,NgbModule,LoadingComponent,SampleSearchPipe,NgSelectModule,NgxPaginationModule,MatTooltipModule],
    
  styleUrls: ['./support-details.component.css']
})
export class SupportDetailsComponent implements OnInit {
  selected_data:any
  data:any
  typeBillings:any[]=[]
  user:any
  permissions:any[]=[]
  loading=false
  loading2=false
  error:any=""
  token:any
  
      constructor(
        private billingService:BillingService,
        config: NgbModalConfig, private modalService: NgbModal,
         private locService:LocalStorageService,
        private route:ActivatedRoute
        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.token= this.route.snapshot.paramMap.get('token')
      if(this.token != undefined)      this.all();

      this.user=this.locService.get(GlobalName.userName);
      this.permissions=this.user.roles[0].permissions;
    }


    all() {
      this.loading2=true;
      this.billingService.show(this.token).subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }

    sendContact(form:NgForm){
      this.billingService.storeResponse({
        content:form.value.content,
        billing_id:this.data.id
      }).subscribe((res:any)=>{
        this.data=res.data
        form.resetForm()
        this.all()
      },
      (err:any)=>{
  
      })
    }


    setStatus(state:any) {
      this.loading2=true;
      this.billingService.setStatus(this.data.id,state).subscribe((res:any)=>{
       
        this.loading2=false;
        this.all()
      },
      (error:any)=>{
        
        this.loading2=false;
      })
    }
  
}
