import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcaDetailsComponent } from './vca-details.component';

describe('VcaDetailsComponent', () => {
  let component: VcaDetailsComponent;
  let fixture: ComponentFixture<VcaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
