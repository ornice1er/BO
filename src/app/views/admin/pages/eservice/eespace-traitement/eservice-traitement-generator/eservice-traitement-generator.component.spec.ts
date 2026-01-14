import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceTraitementGeneratorComponent } from './eservice-traitement-generator.component';

describe('EserviceTraitementGeneratorComponent', () => {
  let component: EserviceTraitementGeneratorComponent;
  let fixture: ComponentFixture<EserviceTraitementGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EserviceTraitementGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EserviceTraitementGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
