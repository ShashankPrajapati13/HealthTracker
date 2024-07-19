import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'workoutUsers';
  private users: User[] = this.loadUsersFromLocalStorage();
  private allUsers: User[] = [...this.users];

  private usersSubject = new BehaviorSubject<User[]>(this.users);
  users$ = this.usersSubject.asObservable();

  addUser(user: User) {
    this.users.push(user);
    this.allUsers.push(user);
    this.saveUsersToLocalStorage();
    this.usersSubject.next(this.users);
  }

  updateUser(updatedUser: User) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.allUsers[index] = updatedUser;
      this.saveUsersToLocalStorage();
      this.usersSubject.next(this.users);
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    this.allUsers = this.allUsers.filter(user => user.id !== id);
    this.saveUsersToLocalStorage();
    this.usersSubject.next(this.users);
  }

  sortByName(): User[] {
    this.users.sort((a, b) => a.name.localeCompare(b.name));
    this.usersSubject.next(this.users);
    return this.users;
  }

  applyFilters(searchTerm: string, filterType: string): User[] {
    let filteredUsers = this.allUsers;

    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filteredUsers = filteredUsers.filter(user => user.type === filterType);
    }

    return filteredUsers;
  }

  private loadUsersFromLocalStorage(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.allUsers));
  }
}
