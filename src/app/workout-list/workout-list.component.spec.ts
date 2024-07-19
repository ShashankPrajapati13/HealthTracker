import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let workoutService: WorkoutService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutListComponent],
      providers: [
        {
          provide: WorkoutService,
          useValue: {
            users$: of([
              { id: 1, name: 'Sam Peter', type: 'Running', minutes: 30 },
              { id: 2, name: 'John Doe', type: 'Swimming', minutes: 45 },
              { id: 3, name: 'Jane Smith', type: 'Cycling', minutes: 60 },
            ]),
            sortByName: jasmine.createSpy('sortByName'),
            filterByType: jasmine.createSpy('filterByType'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    workoutService = TestBed.inject(WorkoutService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sortByName on header click', () => {
    const header = fixture.nativeElement.querySelector('th');
    header.click();

    expect(workoutService.sortByName).toHaveBeenCalled();
  });
});
