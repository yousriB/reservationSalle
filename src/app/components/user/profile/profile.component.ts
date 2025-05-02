import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  userData: any;
  password: string = "";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser(localStorage.getItem('userId')!).subscribe({
      next: (user) => {
        this.userData = user;
      },
      error: (error) => {
        console.error('Failed to get current user:', error);
      }
    });
  }

  UpdateUser() {
    this.userService.updateUser(this.userData._id, this.userData.name, this.userData.email, this.userData.phoneNumber, this.password).subscribe({
      next: (user) => {
      },
      error: (error) => {
        console.error('Failed to update user:', error);
      }
    });
  }
}