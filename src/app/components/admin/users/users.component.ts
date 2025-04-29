import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users = [
    { name: 'John Smith', email: 'john.smith@example.com', phone: '123-456-7890' },
    { name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '987-654-3210' },
    { name: 'Michael Brown', email: 'michael.brown@example.com', phone: '555-555-5555' }
  ];
}
