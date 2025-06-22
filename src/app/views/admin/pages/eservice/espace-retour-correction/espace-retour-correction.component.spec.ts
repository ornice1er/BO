import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceRetourCorrectionComponent } from './espace-retour-correction.component';

describe('EspaceRetourCorrectionComponent', () => {
  let component: EspaceRetourCorrectionComponent;
  let fixture: ComponentFixture<EspaceRetourCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceRetourCorrectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceRetourCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
