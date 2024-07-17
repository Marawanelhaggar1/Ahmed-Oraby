import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubServiceComponent } from './all-sub-service.component';

describe('AllSubServiceComponent', () => {
  let component: AllSubServiceComponent;
  let fixture: ComponentFixture<AllSubServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSubServiceComponent]
    });
    fixture = TestBed.createComponent(AllSubServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
