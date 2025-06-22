import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceSignedComponent } from './espace-signed.component';

describe('EspaceSignedComponent', () => {
  let component: EspaceSignedComponent;
  let fixture: ComponentFixture<EspaceSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceSignedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
