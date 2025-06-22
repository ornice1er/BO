import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpapDetailsComponent } from './adpap-details.component';

describe('AdpapDetailsComponent', () => {
  let component: AdpapDetailsComponent;
  let fixture: ComponentFixture<AdpapDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpapDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
