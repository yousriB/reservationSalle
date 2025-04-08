import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  // Initialize form fields
  bookingForm = {
    name: '',
    email: '',
    eventType: '',
    eventDate: '',
    message: ''
  };

  // Function to handle form submission
  submitForm() {
    console.log('Booking details:', this.bookingForm);
    // Here you can add your logic to send the data to a backend API
  }
}
