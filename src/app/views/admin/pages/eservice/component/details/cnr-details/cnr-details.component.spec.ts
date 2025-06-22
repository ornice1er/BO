import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnrDetailsComponent } from './cnr-details.component';

describe('CnrDetailsComponent', () => {
  let component: CnrDetailsComponent;
  let fixture: ComponentFixture<CnrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
