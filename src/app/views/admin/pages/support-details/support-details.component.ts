import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingService } from 'src/app/core/_services/billing.service';
import { LocalService } from 'src/app/core/_services/storage_services/local.service';
import { globalName } from 'src/app/core/_utils/utils';

@Component({
  selector: 'app-support-details',
  templateUrl: './support-details.component.html',
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
        private locService:LocalService,
        private route:ActivatedRoute
        ){
          config.backdrop = 'static';
          config.keyboard = false;
      } 
  
    ngOnInit(): void {
      this.token= this.route.snapshot.paramMap.get('token')
      if(this.token != undefined)      this.all();

      this.user=this.locService.getItem(globalName.user);
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
