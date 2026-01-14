import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatiistiqueComponent } from './statiistique.component';

describe('StatiistiqueComponent', () => {
  let component: StatiistiqueComponent;
  let fixture: ComponentFixture<StatiistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatiistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatiistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
