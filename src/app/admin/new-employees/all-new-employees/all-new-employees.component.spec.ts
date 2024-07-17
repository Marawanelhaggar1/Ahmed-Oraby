import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewEmployeesComponent } from './all-new-employees.component';

describe('AllNewEmployeesComponent', () => {
  let component: AllNewEmployeesComponent;
  let fixture: ComponentFixture<AllNewEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllNewEmployeesComponent]
    });
    fixture = TestBed.createComponent(AllNewEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
