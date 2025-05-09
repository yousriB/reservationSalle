import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';
  
    if (!this.name.trim() || !this.email.trim() || !this.phoneNumber.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
      this.errorMessage = 'All fields are required.';
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }
  
    const phoneRegex = /^\d{8}$/; // example: 8 digits for Tunisia
    if (!phoneRegex.test(this.phoneNumber)) {
      this.errorMessage = 'Phone number must be 8 digits.';
      return;
    }
  
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }
  
    this.userService.registerUser(this.name, this.email, this.phoneNumber, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
  
}