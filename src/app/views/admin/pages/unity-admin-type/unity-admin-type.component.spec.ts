import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityAdminTypeComponent } from './unity-admin-type.component';

describe('UnityAdminTypeComponent', () => {
  let component: UnityAdminTypeComponent;
  let fixture: ComponentFixture<UnityAdminTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnityAdminTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityAdminTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
