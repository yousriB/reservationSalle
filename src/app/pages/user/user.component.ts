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
     // Check if token exists in localStorage
     const userId = localStorage.getItem('userId');
     if (!userId) {
       // Redirect to login if no token is found
       this.router.navigate(['/login']);
     }
     const role = localStorage.getItem('role');
     if (role !== 'user') {
       this.router.navigate(['/admin']);
     }
     this.getCurrentUser(userId);
  }
  getCurrentUser(userId:any) {
    return this.userService.getCurrentUser(userId).subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
      }
    });
  }
}
