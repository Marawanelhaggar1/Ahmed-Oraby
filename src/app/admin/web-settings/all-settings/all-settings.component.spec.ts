import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSettingsComponent } from './all-settings.component';

describe('AllSettingsComponent', () => {
  let component: AllSettingsComponent;
  let fixture: ComponentFixture<AllSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSettingsComponent]
    });
    fixture = TestBed.createComponent(AllSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
