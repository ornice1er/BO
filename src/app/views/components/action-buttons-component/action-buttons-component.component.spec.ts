import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponentComponent } from './action-buttons-component.component';

describe('ActionButtonsComponentComponent', () => {
  let component: ActionButtonsComponentComponent;
  let fixture: ComponentFixture<ActionButtonsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionButtonsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
