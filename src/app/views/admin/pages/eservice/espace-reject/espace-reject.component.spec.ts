import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceRejectComponent } from './espace-reject.component';

describe('EspaceRejectComponent', () => {
  let component: EspaceRejectComponent;
  let fixture: ComponentFixture<EspaceRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceRejectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
