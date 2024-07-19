import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  page: number = 1;
  itemsPerPage: number = 5;
  workoutTypes: string[] = ['Running', 'Swimming', 'Cycling', 'Yoga', 'Strength Training'];
  searchTerm: string = '';
  filterType: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('filterSelect') filterSelect!: ElementRef;

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit(): void {
    this.workoutService.users$.subscribe(users => {
      this.users = users;
      this.applyFilters();
    });

    // Apply the saved filter values
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.value = this.searchTerm;
      }
      if (this.filterSelect) {
        this.filterSelect.nativeElement.value = this.filterType;
      }
    }, 0);
  }

  updateDisplayedUsers(): void {
    const startIdx = (this.page - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    this.displayedUsers = this.users.slice(startIdx, endIdx);

    // Check if the current page has no data and navigate to the previous page if necessary
    if (this.displayedUsers.length === 0 && this.page > 1) {
      this.page--;
      this.updateDisplayedUsers();
    }
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.updateDisplayedUsers();
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = value;
    this.applyFilters();
  }

  filterByType(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterType = value;
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredUsers = this.workoutService.applyFilters(this.searchTerm, this.filterType);
    this.users = filteredUsers;
    this.page = 1;  // Reset to the first page when applying filters
    this.updateDisplayedUsers();
  }

  sortByName(): void {
    this.users = this.workoutService.sortByName();
    this.updateDisplayedUsers();
  }

  deleteUser(id: number): void {
    this.workoutService.deleteUser(id);
    this.applyFilters();
  }

  editUser(user: User): void {
    this.router.navigate(['/form'], { queryParams: { id: user.id } });
  }
}
