import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
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
    entertainment: [] as string[]
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
  }

  submitForm() {
    console.log(this.bookingForm);
    // Call your backend API to submit the form data
  }
}
