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
import { ToastrService } from 'ngx-toastr';
import { AppSweetAlert } from '../../../../core/utils/app-sweet-alert';

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
  buttonsPermission :any|undefined;
is_active=false
search_text:any=""
remoteSearchData: any[] = []
  token:any
    pg={
    pageSize:10,
    p:1,
    total:0
  }
  isPaginate=true
  selectedId: number | null = null;
  
      constructor(
        private billingService:BillingService,
            private toastrService:ToastrService,
      
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
       this.buttonsPermission = {
      show:true,
      add:true,
      edit:true,
      delete:true
    };
    }


    all() {
      this.loading2=true;
      this.billingService.show(this.token).subscribe((res:any)=>{
        this.data=res.data
        this.loading2=false;
                this.selectedId=null

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

     onSearchChange() {
  const localResults = this.data.filter((d:any) => d.name.includes(this.search_text));
  if (this.search_text.length > 2 && localResults.length === 0) {
    this.searchRemotely();
  }
}

  searchRemotely() {
  if (!this.search_text || this.search_text.trim().length < 2) return;

  this.loading = true;

  this.billingService.search({search:this.search_text}).subscribe({
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
  this.all(); // méthode pour recharger les données initiales
}


  getPage(event:any){
    if (this.isPaginate) {
      this.pg.p=event
      this.all();
    } else {
          this.pg.p=event
    }
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
