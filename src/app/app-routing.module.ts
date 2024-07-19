import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutProgressComponent } from './workout-progress/workout-progress.component';

const routes: Routes = [
  { path: 'list', component: WorkoutListComponent },
  { path: 'progress', component: WorkoutProgressComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
