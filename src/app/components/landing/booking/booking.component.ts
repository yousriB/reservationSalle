import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { UserService } from '../../../services/user.service';
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
  
  // Configuration options loaded from backend
  eventTypes= [
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
    // Set minimum date to today
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
    return !!this.bookingForm.title &&
           !!this.bookingForm.typeEvent &&
           !!this.bookingForm.date &&
           !!this.bookingForm.time &&
           this.bookingForm.duration > 0 &&
           this.bookingForm.numberOfSeats > 0 &&
           !!this.bookingForm.local &&
           !!this.bookingForm.foodType &&
           !!this.bookingForm.decorationType &&
           !!this.bookingForm.paymentMethod;
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
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

  // Add this to your component class
calculateBasePrice(): number {
  let total = 0;
  
  // Base prices
  total += 200; // Venue
  total += 100; // Food
  total += 100; // Decoration
  
  // Entertainment (each option adds $100)
  total += this.bookingForm.entertainment.length * 100;
  
  // Additional services
  if (this.bookingForm.transport) total += 100;
  if (this.bookingForm.security) total += 100;
  
  return total;
}

calculateTotalPrice(): string {
  // Calculate duration multiplier (minimum 1)
  const duration = this.bookingForm.duration * 10;
  
  // Calculate guest multiplier
  const guests =  this.bookingForm.numberOfSeats;
  const guestMultiplier = guests * 5;
  
  const basePrice = this.calculateBasePrice();
  const totalPrice = basePrice + duration + guestMultiplier;
  
  return totalPrice.toFixed(2);
}
}
