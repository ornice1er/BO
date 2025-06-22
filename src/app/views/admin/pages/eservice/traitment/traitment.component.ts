import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../../../../core/_services/files.service';
import { PrestationService } from '../../../../core/_services/prestation.service';
import { RequeteService } from '../../../../core/_services/requete.service';

declare const WebViewer: any;


@Component({
  selector: 'ngx-traitment',
  templateUrl: './traitment.component.html',
  styleUrls: ['./traitment.component.css']
})
export class TraitmentComponent implements OnInit, AfterViewInit {

  @ViewChild('viewer') viewer: ElementRef | undefined;


  wvInstance: any;
  reqCode: string | undefined | null
  fileCode: string | undefined | null
  slug : string | undefined | null
  
  constructor( private route: ActivatedRoute,private reqService:RequeteService  ){
    this.reqCode= this.route.snapshot.paramMap.get('reqCode');
    if(this.route.snapshot.paramMap.has('fileCode'))this.fileCode=this.route.snapshot.paramMap.get('fileCode');
     this.slug=this.route.snapshot.paramMap.get('slug');
     
   }
  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);

    this.reqService.getForTreatment(this.reqCode,this.slug).subscribe( (res:any)=>{
      console.log(res)
    })
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    const annotManager = this.wvInstance.annotManager;
    // and access classes defined in the WebViewer iframe
    const { Annotations } = this.wvInstance;
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotManager.getCurrentUser();
    annotManager.addAnnotation(rectangle);
    annotManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewerInstance.html for the full list of low-level APIs
  }

  ngAfterViewInit(): void {

    // The following code initiates a new instance of WebViewer.

    WebViewer({
      path: '../../wv-resources/lib',
      initialDoc: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'
    }, this.viewer?.nativeElement).then((instance:any) => {
      this.wvInstance = instance;

      // now you can access APIs through this.webviewer.getInstance()
      instance.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis 
      // for the full list of APIs

      // or listen to events from the viewer element
      this.viewer?.nativeElement.addEventListener('pageChanged', (e:any) => {
        const [ pageNumber ] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.docViewer.on('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler)
    })
  }
 
 
}
