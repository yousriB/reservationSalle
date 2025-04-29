import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  isLogin = false;

  constructor(
    private bookingService: BookingService, 
    private snackBar: MatSnackBar, 
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token is found
      this.router.navigate(['/login']);
    }
  }

  bookingForm = {
    title: '',
    time: '',
    date: '',
    foodType: '',
    decorationType: '',
    numberOfSeats: null,
    typeEvent: '',
    local: '',
    transport: false,
    security: false,
    entertainment: [] as string[],
    userId: '',
  };

  entertainment = {
    dj: false,
    magicShow: false,
    fireWork: false,
    dancer: false
  };

  updateEntertainment() {
    this.bookingForm.entertainment = Object.keys(this.entertainment)
      .filter(key => this.entertainment[key as keyof typeof this.entertainment])
      .map(key => key === 'magicShow' ? 'magic show' : (key === 'fireWork' ? 'fire work' : key));
    this.bookingForm.userId = localStorage.getItem('userId') || '';
  }

  submitForm() {
    this.updateEntertainment();
    this.bookingService.createEvent(this.bookingForm).subscribe({
      next: (response) => {
        console.log('Event created successfully:', response);
        this.snackBar.open('Booking created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'] // Add a custom CSS class for success
        });
      },
      error: (error) => {
        console.error('Error creating event:', error);
        this.snackBar.open('Error creating booking.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'] // Add a custom CSS class for error
        });
      }
    });
  }
}
