import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlDetailsComponent } from './al-details.component';

describe('AlDetailsComponent', () => {
  let component: AlDetailsComponent;
  let fixture: ComponentFixture<AlDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
