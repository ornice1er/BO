import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsfDetailsComponent } from './asf-details.component';

describe('AsfDetailsComponent', () => {
  let component: AsfDetailsComponent;
  let fixture: ComponentFixture<AsfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
