import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpecialitiesComponent } from './all-specialities.component';

describe('AllSpecialitiesComponent', () => {
  let component: AllSpecialitiesComponent;
  let fixture: ComponentFixture<AllSpecialitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSpecialitiesComponent]
    });
    fixture = TestBed.createComponent(AllSpecialitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
