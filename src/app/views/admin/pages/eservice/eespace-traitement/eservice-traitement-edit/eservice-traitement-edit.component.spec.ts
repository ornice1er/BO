import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceTraitementEditComponent } from './eservice-traitement-edit.component';

describe('EserviceTraitementEditComponent', () => {
  let component: EserviceTraitementEditComponent;
  let fixture: ComponentFixture<EserviceTraitementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EserviceTraitementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EserviceTraitementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
