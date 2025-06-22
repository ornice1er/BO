import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnrTableComponent } from './cnr-table.component';

describe('CnrTableComponent', () => {
  let component: CnrTableComponent;
  let fixture: ComponentFixture<CnrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
