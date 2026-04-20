import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillEditorWrapperComponent } from './quill-editor-wrapper.component';

describe('QuillEditorWrapperComponent', () => {
  let component: QuillEditorWrapperComponent;
  let fixture: ComponentFixture<QuillEditorWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillEditorWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillEditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
