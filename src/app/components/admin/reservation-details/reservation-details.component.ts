import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-details',
  standalone: false,
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {
  reservationId: string = '';  // To store the reservation ID
  reservation: any = {};  // To store the reservation details

  constructor(
    private route: ActivatedRoute,  // Inject ActivatedRoute to get the URL parameter
    private bookingService: BookingService, private router: Router  // Inject the service to get reservation details
  ) {}

  ngOnInit(): void {
    // Get the reservation ID from the URL
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';  // Fetch the ID from the URL params

    if (this.reservationId) {
      // Fetch reservation details using the reservation ID
      this.getReservationDetails(this.reservationId);
    }
  }

  // Method to fetch reservation details
  getReservationDetails(id: string): void {
    this.bookingService.getEventById(id).subscribe(
      (details: any) => {
        this.reservation = details;  // Store the fetched reservation details
      },
      (error: any) => {
        console.error('Error fetching reservation details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
