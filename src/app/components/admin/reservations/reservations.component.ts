import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {


  @Input() activeTab: string = 'reservations';
  @Output() onTabChange = new EventEmitter<string>();

  reservations: any[] = [];  // Placeholder for reservation data
  userEmails: { [userId: string]: string } = {};

  constructor(
    private bookingService: BookingService, 
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    // Replace with your actual service method to fetch reservations
    this.bookingService.getEvents().subscribe((res: any) => {
      this.reservations = res;
      this.reservations.forEach(reservation => {
        this.userService.getCurrentUser(reservation.userId).subscribe(user => {
          this.userEmails[reservation.userId] = user.email;
        });
      });
    });
  }

  deleteReservation(id: any) {
    this.bookingService.deleteEvent(id).subscribe((res: any) => {
      console.log(res);
      this.getEvents();
    });
    }

  changeStatus(id: any, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;

    if (status) {
      this.bookingService.updateEventStatus(id, status).subscribe((res: any) => {
        console.log(res);
        this.getEvents();
      });
    }
  }

  // When the "Details" button is clicked, set the active tab to 'reservation-details' and pass the reservation ID
  sendReservationDetails(id: string): void {
    this.router.navigate(['/reservation-details', id]);
  }
}
