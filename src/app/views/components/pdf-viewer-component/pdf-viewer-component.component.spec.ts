import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerComponentComponent } from './pdf-viewer-component.component';

describe('PdfViewerComponentComponent', () => {
  let component: PdfViewerComponentComponent;
  let fixture: ComponentFixture<PdfViewerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfViewerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
