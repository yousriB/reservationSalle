import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  // Function to handle login submission
  login() {
    console.log('Logging in with:', this.email, this.password);
    // Here you can add your login logic (e.g., call an API)
  }
}
