import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import { User } from '../models/user';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  workoutForm!: FormGroup;
  workoutTypes: string[] = ['Running', 'Swimming', 'Cycling', 'Yoga', 'Strength Training'];
  isEdit: boolean = false;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.workoutService.users$.subscribe(users => {
          const userToEdit = users.find((user: User) => user.id === +id);
          if (userToEdit) {
            this.userId = userToEdit.id;
            this.workoutForm.patchValue(userToEdit);
            this.isEdit = true;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      const formValue = this.workoutForm.value;
      if (this.isEdit) {
        const updatedUser: User = { id: this.userId, ...formValue };
        this.workoutService.updateUser(updatedUser);
      } else {
        const newUser: User = { id: Date.now(), ...formValue };
        this.workoutService.addUser(newUser);
      }
      this.router.navigate(['/list']);
    }
  }
}
