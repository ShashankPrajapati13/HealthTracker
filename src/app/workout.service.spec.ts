import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User } from './models/user';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const user: User = { id: 4, name: 'New User', type: 'Yoga', minutes: 50 };
    service.addUser(user);
    service.users$.subscribe(users => {
      expect(users).toContain(user);
    });
  });4
  

  it('should sort users by name', () => {
    service.sortByName();
    service.users$.subscribe(users => {
      expect(users[0].name).toBe('Jane Smith');
    });
  });

  it('should filter users by type', () => {
    service.filterByType('Running');
    service.users$.subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].type).toBe('Running');
    });
  });
});
