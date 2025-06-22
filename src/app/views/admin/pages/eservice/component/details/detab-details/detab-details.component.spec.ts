import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetabDetailsComponent } from './detab-details.component';

describe('DetabDetailsComponent', () => {
  let component: DetabDetailsComponent;
  let fixture: ComponentFixture<DetabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
