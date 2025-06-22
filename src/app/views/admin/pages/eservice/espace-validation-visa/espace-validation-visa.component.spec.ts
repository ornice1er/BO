import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceValidationVisaComponent } from './espace-validation-visa.component';

describe('EspaceValidationVisaComponent', () => {
  let component: EspaceValidationVisaComponent;
  let fixture: ComponentFixture<EspaceValidationVisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceValidationVisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceValidationVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
