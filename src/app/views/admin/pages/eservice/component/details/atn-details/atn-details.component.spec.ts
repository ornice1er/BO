import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtnDetailsComponent } from './atn-details.component';

describe('AtnDetailsComponent', () => {
  let component: AtnDetailsComponent;
  let fixture: ComponentFixture<AtnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
