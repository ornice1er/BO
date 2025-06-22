import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VcaTableComponent } from './vca-table.component';

describe('VcaTableComponent', () => {
  let component: VcaTableComponent;
  let fixture: ComponentFixture<VcaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VcaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VcaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
