import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceSignatureComponent } from './espace-signature.component';

describe('EspaceSignatureComponent', () => {
  let component: EspaceSignatureComponent;
  let fixture: ComponentFixture<EspaceSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
