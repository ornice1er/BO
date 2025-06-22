import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsaDetailsComponent } from './vsa-details.component';

describe('VsaDetailsComponent', () => {
  let component: VsaDetailsComponent;
  let fixture: ComponentFixture<VsaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
