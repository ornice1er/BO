import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpapTableComponent } from './adpap-table.component';

describe('AdpapTableComponent', () => {
  let component: AdpapTableComponent;
  let fixture: ComponentFixture<AdpapTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpapTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
