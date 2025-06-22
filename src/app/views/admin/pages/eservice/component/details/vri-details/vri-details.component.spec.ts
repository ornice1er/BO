import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VriDetailsComponent } from './vri-details.component';

describe('VriDetailsComponent', () => {
  let component: VriDetailsComponent;
  let fixture: ComponentFixture<VriDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VriDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VriDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
