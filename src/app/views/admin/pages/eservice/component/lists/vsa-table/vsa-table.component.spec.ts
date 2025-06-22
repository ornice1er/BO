import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsaTableComponent } from './vsa-table.component';

describe('VsaTableComponent', () => {
  let component: VsaTableComponent;
  let fixture: ComponentFixture<VsaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
