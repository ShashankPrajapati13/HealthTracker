import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppComponent } from './app.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { WorkoutProgressComponent } from './workout-progress/workout-progress.component';

const routes: Routes = [
  { path: '', component: WorkoutListComponent },
  { path: 'form', component: WorkoutFormComponent },
  { path: 'list', component: WorkoutListComponent },
  { path: 'progress', component: WorkoutProgressComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    CustomPaginationComponent,
    WorkoutProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
