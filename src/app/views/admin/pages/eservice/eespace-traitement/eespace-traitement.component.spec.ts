import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EespaceTraitementComponent } from './eespace-traitement.component';

describe('EespaceTraitementComponent', () => {
  let component: EespaceTraitementComponent;
  let fixture: ComponentFixture<EespaceTraitementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EespaceTraitementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EespaceTraitementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
