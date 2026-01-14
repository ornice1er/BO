import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseDisplayComponentComponent } from './response-display-component.component';

describe('ResponseDisplayComponentComponent', () => {
  let component: ResponseDisplayComponentComponent;
  let fixture: ComponentFixture<ResponseDisplayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseDisplayComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseDisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
