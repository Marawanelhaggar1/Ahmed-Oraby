import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCentersComponent } from './all-centers.component';

describe('AllCentersComponent', () => {
  let component: AllCentersComponent;
  let fixture: ComponentFixture<AllCentersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCentersComponent]
    });
    fixture = TestBed.createComponent(AllCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
