import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceFinishComponent } from './espace-finish.component';

describe('EspaceFinishComponent', () => {
  let component: EspaceFinishComponent;
  let fixture: ComponentFixture<EspaceFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaceFinishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaceFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
