import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCareerComponent } from './all-career.component';

describe('AllCareerComponent', () => {
  let component: AllCareerComponent;
  let fixture: ComponentFixture<AllCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCareerComponent]
    });
    fixture = TestBed.createComponent(AllCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
