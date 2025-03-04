import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  userReservations = [
    { id: 1, eventType: "Wedding", date: "2024-03-10", location: "Banquet Hall", guests: 100, status: "Pending" },
    { id: 2, eventType: "Birthday Party", date: "2024-04-05", location: "Outdoor Venue", guests: 30, status: "Approved" },
    { id: 3, eventType: "Conference", date: "2024-05-12", location: "Conference Room", guests: 200, status: "Rejected" }
  ];

  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedReservation: any = null;
}
