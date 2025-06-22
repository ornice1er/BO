import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashService } from '../../../../core/_services/dash.service';

@Component({
  selector: 'ngx-statistiques',
  templateUrl: './statistiques.component.html',
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
