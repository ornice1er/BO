import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent2Component } from './loading-component2.component';

describe('LoadingComponent2Component', () => {
  let component: LoadingComponent2Component;
  let fixture: ComponentFixture<LoadingComponent2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingComponent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
