import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EserviceTraitementShowComponent } from './eservice-traitement-show.component';

describe('EserviceTraitementShowComponent', () => {
  let component: EserviceTraitementShowComponent;
  let fixture: ComponentFixture<EserviceTraitementShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EserviceTraitementShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EserviceTraitementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
