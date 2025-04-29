import { Component } from '@angular/core';

@Component({
  selector: 'app-user-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class UserReservationsComponent {
  reservations = [
    { event: 'Wedding Reception', date: '2025-06-15', status: 'Confirmed' },
    { event: 'Corporate Dinner', date: '2025-07-22', status: 'Pending' },
    { event: 'Birthday Party', date: '2025-08-10', status: 'Confirmed' },
  ];
}
