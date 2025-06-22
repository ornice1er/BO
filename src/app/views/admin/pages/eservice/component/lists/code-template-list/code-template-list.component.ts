import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-code-template-list',
  templateUrl: './code-template-list.component.html',
  styleUrls: ['./code-template-list.component.css']
})
export class CodeTemplateListComponent {

  @Input() dtOptions :any;
  @Input() dtTrigger :any;
  @Input() data :any;
  @Input() loading2 :any;
  @Input() selected_data:any;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() uploadFile = new EventEmitter<string>();

  @Input() refChild:any;
  @Input() user:any;
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

  
  getJson(el:any){
    if (el == undefined) {
      return null;

    }else{
      return JSON.parse(el)

    }
  }
}
