import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTemplateDetailsComponent } from './code-template-details.component';

describe('CodeTemplateDetailsComponent', () => {
  let component: CodeTemplateDetailsComponent;
  let fixture: ComponentFixture<CodeTemplateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTemplateDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
