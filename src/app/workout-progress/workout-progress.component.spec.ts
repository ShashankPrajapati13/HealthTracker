import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProgressComponent } from './workout-progress.component';

describe('WorkoutProgressComponent', () => {
  let component: WorkoutProgressComponent;
  let fixture: ComponentFixture<WorkoutProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutProgressComponent]
    });
    fixture = TestBed.createComponent(WorkoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
