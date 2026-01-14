import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceRejectedComponent } from './espace-rejected.component';

describe('EspaceRejectedComponent', () => {
  let component: EspaceRejectedComponent;
  let fixture: ComponentFixture<EspaceRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceRejectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
