import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Swimming', 'Cycling', 'Yoga', 'Strength Training'];
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.workoutService.users$.subscribe(users => {
          const userToEdit = users.find((user: User) => user.id === +id);
          if (userToEdit) {
            this.workoutForm.patchValue(userToEdit);
            this.isEdit = true;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.workoutForm.invalid) {
      return;
    }

    const user = this.workoutForm.value;

    if (this.isEdit) {
      this.workoutService.updateUser(user);
    } else {
      const newUser = { ...user, id: Date.now() };
      this.workoutService.addUser(newUser);
    }
    this.router.navigate(['/list']);
  }
}
