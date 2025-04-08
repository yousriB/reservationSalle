import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
 // Example data for profile, can be dynamic
 user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: '',
  phoneNumber: '+212 6 55 55 55 55'
};

// Function to save changes to profile
saveChanges() {
  // Logic to save changes (e.g., call API)
  console.log('Profile updated', this.user);
}
}
