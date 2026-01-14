import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceValidationComponent } from './espace-validation.component';

describe('EspaceValidationComponent', () => {
  let component: EspaceValidationComponent;
  let fixture: ComponentFixture<EspaceValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
