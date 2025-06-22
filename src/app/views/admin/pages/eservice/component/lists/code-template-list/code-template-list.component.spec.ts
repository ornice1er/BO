import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTemplateListComponent } from './code-template-list.component';

describe('CodeTemplateListComponent', () => {
  let component: CodeTemplateListComponent;
  let fixture: ComponentFixture<CodeTemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeTemplateListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
