import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentUser: any;
  constructor(private userService: UserService, private router: Router) {}
  activeTab = 'account'; // Default tab

  // Function to change the active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return this.userService.getCurrentUser(token).subscribe({
      next: (user) => {
        this.currentUser = user;
        console.log(this.currentUser);
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
      }
    });
  }
}
