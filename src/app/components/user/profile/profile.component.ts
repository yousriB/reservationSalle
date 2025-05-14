import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userData: any;
  password: string = "";

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getCurrentUser(localStorage.getItem('userId')!).subscribe({
      next: (user) => {
        this.userData = user;
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
        this.snackBar.open('Failed to get current user!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  UpdateUser() {
    this.userService.updateUser(this.userData._id, this.userData.name, this.userData.email, this.userData.phoneNumber, this.password).subscribe({
      next: (user) => {
        this.snackBar.open('User updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Failed to update user:', error);
        this.snackBar.open('Failed to update user!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}