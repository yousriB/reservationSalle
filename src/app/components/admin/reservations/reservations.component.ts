import { Component } from '@angular/core';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
 // Example reservation data
 reservations = [
  { customer: 'John Smith', event: 'Wedding Reception', date: '2025-06-15', status: 'Pending' },
  { customer: 'Sarah Johnson', event: 'Corporate Dinner', date: '2025-07-22', status: 'Approved' },
  { customer: 'Michael Brown', event: 'Birthday Party', date: '2025-08-10', status: 'Pending' },
  { customer: 'Emily Davis', event: 'Anniversary Celebration', date: '2025-09-05', status: 'Approved' },
];

// Change reservation status (approve/reject)
changeStatus(reservation: any, status: string) {
  reservation.status = status;
}
}
