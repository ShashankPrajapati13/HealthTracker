import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [FormsModule],
      providers: [WorkoutService]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a user on submit', () => {
    const user = { id: 0, name: 'Test User', type: 'Running', minutes: 30 };
    component.user = user;
  
    spyOn(workoutService, 'addUser').and.callThrough();
    component.onSubmit();
  
    expect(workoutService.addUser).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'Test User',
      type: 'Running',
      minutes: 30,
      id: jasmine.any(Number)
    }));
  });
  
  
});
