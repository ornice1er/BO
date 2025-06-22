import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetabTableComponent } from './detab-table.component';

describe('DetabTableComponent', () => {
  let component: DetabTableComponent;
  let fixture: ComponentFixture<DetabTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetabTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetabTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
