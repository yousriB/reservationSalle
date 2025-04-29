import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  // Function to handle login submission
  login() {
    this.userService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful! Redirecting to dashboard...';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
