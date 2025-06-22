import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmTableComponent } from './am-table.component';

describe('AmTableComponent', () => {
  let component: AmTableComponent;
  let fixture: ComponentFixture<AmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
