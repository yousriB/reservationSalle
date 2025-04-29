import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
saveChanges() {
throw new Error('Method not implemented.');
}
  constructor(private userService: UserService) {}
  
  // Example data for profile, will be populated with real data
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  };
  
  userData: any;

  ngOnInit(): void {
  }

}