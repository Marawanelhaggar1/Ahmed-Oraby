import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDentalServiceComponent } from './all-dental-service.component';

describe('AllDentalServiceComponent', () => {
  let component: AllDentalServiceComponent;
  let fixture: ComponentFixture<AllDentalServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDentalServiceComponent]
    });
    fixture = TestBed.createComponent(AllDentalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
