import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapePrestationStatusComponent } from './etape-prestation-status.component';

describe('EtapePrestationStatusComponent', () => {
  let component: EtapePrestationStatusComponent;
  let fixture: ComponentFixture<EtapePrestationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtapePrestationStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtapePrestationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
