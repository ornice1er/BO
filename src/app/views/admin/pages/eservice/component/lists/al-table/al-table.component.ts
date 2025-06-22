import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-al-table',
  templateUrl: './al-table.component.html',
  styleUrls: ['./al-table.component.css']
})
export class AlTableComponent implements OnInit {

  @Input() dtOptions :any;
  @Input() dtTrigger :any;
  @Input() data :any;
  @Input() loading2 :any;
  @Input() selected_data:any;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() refChild:any;
  @Input() user:any;
  @Output() uploadFile = new EventEmitter<string>();
  @Input() showLastLevel:any=false;

  constructor() { }

  ngOnInit(): void {
  }
  checked(el:any){
    this.selected_data=el
    this.newItemEvent.emit(el);
  }


  showFile2(el:any){
    this.selected_data=el
    this.uploadFile.emit(el.code+"/"+el.filename);
  }
}
