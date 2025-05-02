import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

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

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    // Replace with your actual service method to fetch reservations
    this.bookingService.getEvents().subscribe((res: any) => {
      this.reservations = res;
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

