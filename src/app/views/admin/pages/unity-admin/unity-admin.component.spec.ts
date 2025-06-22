import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityAdminComponent } from './unity-admin.component';

describe('UnityAdminComponent', () => {
  let component: UnityAdminComponent;
  let fixture: ComponentFixture<UnityAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnityAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
