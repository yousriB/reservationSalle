import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  reservations = [
    { id: 1, name: "John Doe", eventType: "Wedding", date: "2024-03-01", status: "Pending" },
    { id: 2, name: "Alice Smith", eventType: "Birthday Party", date: "2024-03-05", status: "Approved" },
    { id: 3, name: "Michael Brown", eventType: "Conference", date: "2024-03-08", status: "Rejected" },
    { id: 4, name: "Emily Davis", eventType: "Engagement", date: "2024-03-12", status: "Pending" }
  ];

  searchQuery: string = "";
  selectedStatus: string = "";
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private router: Router) {}

  filteredReservations() {
    return this.reservations.filter(reservation =>
      (reservation.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
       reservation.eventType.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (this.selectedStatus ? reservation.status === this.selectedStatus : true)
    );
  }

  paginatedReservations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredReservations().slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.filteredReservations().length / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }

  seeInfo(reservation: any) {
    this.router.navigate(['/reservation-details', reservation.id]);
  }

  approveReservation(reservation: any) {
    reservation.status = "Approved";
  }

  rejectReservation(reservation: any) {
    reservation.status = "Rejected";
  }
}
