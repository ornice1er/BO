import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsfTableComponent } from './asf-table.component';

describe('AsfTableComponent', () => {
  let component: AsfTableComponent;
  let fixture: ComponentFixture<AsfTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsfTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
