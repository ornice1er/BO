import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceSignatureShowComponent } from './espace-signature-show.component';

describe('EspaceSignatureShowComponent', () => {
  let component: EspaceSignatureShowComponent;
  let fixture: ComponentFixture<EspaceSignatureShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceSignatureShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceSignatureShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
