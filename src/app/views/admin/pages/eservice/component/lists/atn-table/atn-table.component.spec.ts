import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtnTableComponent } from './atn-table.component';

describe('AtnTableComponent', () => {
  let component: AtnTableComponent;
  let fixture: ComponentFixture<AtnTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtnTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
