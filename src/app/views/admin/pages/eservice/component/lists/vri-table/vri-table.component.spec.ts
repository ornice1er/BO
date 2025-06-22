import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VriTableComponent } from './vri-table.component';

describe('VriTableComponent', () => {
  let component: VriTableComponent;
  let fixture: ComponentFixture<VriTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VriTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VriTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
