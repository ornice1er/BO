import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrestationService } from '../../../../core/_services/prestation.service';
import { LocalService } from '../../../../core/_services/storage_services/local.service';

@Component({
  selector: 'ngx-prestation-details',
  templateUrl: './prestation-details.component.html',
  styleUrls: ['./prestation-details.component.css']
})
export class PrestationDetailsComponent implements OnInit {
slug:any;
desc:any;

  constructor(
    private activatedRoute:ActivatedRoute ,
        private locService:LocalService,
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
