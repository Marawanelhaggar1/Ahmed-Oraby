import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSlidesComponent } from './all-slides.component';

describe('AllSlidesComponent', () => {
  let component: AllSlidesComponent;
  let fixture: ComponentFixture<AllSlidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSlidesComponent]
    });
    fixture = TestBed.createComponent(AllSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
