import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Function to handle registration
  register() {
    if (this.password === this.confirmPassword) {
      console.log('Registering user with:', this.firstName, this.lastName, this.email);
      // Here you can add your registration logic (e.g., call an API)
    } else {
      console.log('Passwords do not match!');
    }
  }
}
