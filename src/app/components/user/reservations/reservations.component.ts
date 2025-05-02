import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reservations',
  standalone: false,
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class UserReservationsComponent implements OnInit {
  constructor(private bookingService: BookingService, private router: Router) {}
  reservations : any[] = [];

  ngOnInit(): void {
    this.bookingService.getEventsByUserId(localStorage.getItem('userId')!).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (error) => {
        console.error('Failed to get reservations:', error);
      }
    });
  }
}
