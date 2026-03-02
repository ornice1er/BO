import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationStatusComponent } from './prestation-status.component';

describe('PrestationStatusComponent', () => {
  let component: PrestationStatusComponent;
  let fixture: ComponentFixture<PrestationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
