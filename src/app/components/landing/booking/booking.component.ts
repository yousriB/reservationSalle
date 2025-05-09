import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  minDate: string;
  isLoading = true;

  eventTypes = [
    { value: 'birthday', label: 'Birthday' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'other', label: 'Other' }
  ];
  foodOptions: any[] = [];
  decorationOptions: any[] = [];
  locationOptions: any[] = [];
  entertainmentOptions: any[] = [];
  paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'transfer', label: 'Bank Transfer' }
  ];

  bookingForm = {
    title: '',
    typeEvent: '',
    date: '',
    time: '',
    duration: 4,
    numberOfSeats: 20,
    local: '',
    foodType: '',
    decorationType: '',
    transport: false,
    security: false,
    entertainment: [] as string[],
    paymentMethod: '',
    userId: localStorage.getItem('userId') || '',
    notes: '',
    totalPrice: 0
  };

  constructor(
    private bookingService: BookingService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadConfigurationOptions();
  }

  loadConfigurationOptions(): void {
    this.adminService.getFoodOptions().subscribe(options => {
      this.foodOptions = options;
    });

    this.adminService.getDecorationOptions().subscribe(options => {
      this.decorationOptions = options;
    });

    this.adminService.getLocationOptions().subscribe(options => {
      this.locationOptions = options;
    });

    this.adminService.getEntertainmentOptions().subscribe(options => {
      this.entertainmentOptions = options;
    });
  }

  isEntertainmentSelected(value: string): boolean {
    return this.bookingForm.entertainment.includes(value);
  }

  toggleEntertainment(value: string): void {
    const index = this.bookingForm.entertainment.indexOf(value);
    if (index === -1) {
      this.bookingForm.entertainment.push(value);
    } else {
      this.bookingForm.entertainment.splice(index, 1);
    }
  }

  isFormValid(): boolean {
    const f = this.bookingForm;
    return !!f.title &&
           !!f.typeEvent &&
           !!f.date &&
           !!f.time &&
           f.duration > 0 &&
           f.numberOfSeats > 0 &&
           f.numberOfSeats <= 200 &&
           !!f.local &&
           !!f.foodType &&
           !!f.decorationType &&
           !!f.paymentMethod;
  }

  submitForm(): void {
    const { title, typeEvent, date, time, duration, numberOfSeats, local, foodType, decorationType, paymentMethod } = this.bookingForm;

    if (!title.trim()) {
      this.snackBar.open('Event title is required', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!typeEvent) {
      this.snackBar.open('Please select an event type', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!date) {
      this.snackBar.open('Date is required', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!time) {
      this.snackBar.open('Time is required', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (duration <= 0) {
      this.snackBar.open('Duration must be greater than 0', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (numberOfSeats <= 0 || numberOfSeats > 200) {
      this.snackBar.open('Number of seats must be between 1 and 200', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!local) {
      this.snackBar.open('Please choose a location', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!foodType) {
      this.snackBar.open('Please select a food option', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!decorationType) {
      this.snackBar.open('Please select a decoration option', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (!paymentMethod) {
      this.snackBar.open('Please choose a payment method', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    this.bookingForm.totalPrice = parseFloat(this.calculateTotalPrice());

    this.bookingService.createEvent(this.bookingForm).subscribe({
      next: (response) => {
        this.snackBar.open('Booking created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Booking error:', error);
        let errorMessage = 'Error creating booking';
        if (error.error?.message) {
          errorMessage = error.error.message;
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  calculateBasePrice(): number {
    let total = 0;

    total += 200; // Venue
    total += 100; // Food
    total += 100; // Decoration

    total += this.bookingForm.entertainment.length * 100;

    if (this.bookingForm.transport) total += 100;
    if (this.bookingForm.security) total += 100;

    return total;
  }

  calculateTotalPrice(): string {
    const duration = this.bookingForm.duration * 10;
    const guests = this.bookingForm.numberOfSeats;
    const guestMultiplier = guests * 5;

    const basePrice = this.calculateBasePrice();
    const totalPrice = basePrice + duration + guestMultiplier;

    return totalPrice.toFixed(2);
  }
}
