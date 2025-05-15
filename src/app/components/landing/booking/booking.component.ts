import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

interface BookingForm {
  title: string;
  date: string;
  paymentMethod: string;
  foodType: string[];
  decorationType: string[];
  numberOfSeats: number;
  typeEvent: string;
  local: string;
  transport: boolean;
  security: boolean;
  entertainment: string[];
  others: string[];
  userId: string;
  totalPrice: number;
}

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  minDate: string;
  isLoading = true;
  locationPrice = 0;
  foodPrice = 0;
  decorationPrice = 0;
  entertainmentPrice = 0;
  otherPrice = 0;

  get locationPriceTotal(): number {
    return this.locationPrice;
  }

  get foodPriceTotal(): number {
    return this.foodPrice;
  }

  get decorationPriceTotal(): number {
    return this.decorationPrice;
  }

  get entertainmentPriceTotal(): number {
    return this.entertainmentPrice;
  }

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
  otherOptions: any[] = [];
  paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'transfer', label: 'Bank Transfer' }
  ];

  bookingForm: BookingForm = {
    title: '',
    typeEvent: '',
    date: '',
    numberOfSeats: 20,
    local: '',
    transport: false,
    security: false,
    entertainment: [],
    paymentMethod: '',
    userId: localStorage.getItem('userId') || '',
    totalPrice: 0,
    foodType: [],
    decorationType: [],
    others: []
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
      this.foodOptions = options.map(option => ({ ...option, price: option.price || 100 }));
    });

    this.adminService.getDecorationOptions().subscribe(options => {
      this.decorationOptions = options.map(option => ({ ...option, price: option.price || 100 }));
    });

     this.adminService.getLocationOptions().subscribe(options => {
      this.locationOptions = options.map(option => ({ ...option, price: option.price || 200 }));
    });

    this.adminService.getEntertainmentOptions().subscribe(options => {
      this.entertainmentOptions = options.map(option => ({ ...option, price: option.price || 100 }));
    });

    this.adminService.getOtherOptions().subscribe(options => {
      this.otherOptions = options.map(option => ({ ...option, price: option.price || 100 }));
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

  toggleFoodType(value: string): void {
    const index = this.bookingForm.foodType.indexOf(value);
    if (index === -1) {
      this.bookingForm.foodType.push(value);
    } else {
      this.bookingForm.foodType.splice(index, 1);
    }
  }

  toggleDecorationType(value: string): void {
    const index = this.bookingForm.decorationType.indexOf(value);
    if (index === -1) {
      this.bookingForm.decorationType.push(value);
    } else {
      this.bookingForm.decorationType.splice(index, 1);
    }
  }

  toggleOther(value: string): void {
    const index = this.bookingForm.others.indexOf(value);
    if (index === -1) {
      this.bookingForm.others.push(value);
    } else {
      this.bookingForm.others.splice(index, 1);
    }
  }

  isFormValid(): boolean {
    const f = this.bookingForm;
    return !!f.title &&
           !!f.typeEvent &&
           !!f.date &&
           f.numberOfSeats > 0 &&
           f.numberOfSeats <= 200 &&
           !!f.local &&
           !!f.paymentMethod;
  }

  submitForm(): void {
    this.bookingForm.totalPrice = parseFloat(this.calculateTotalPrice());

    const bookingFormCopy: BookingForm = {
      title: this.bookingForm.title,
      typeEvent: this.bookingForm.typeEvent,
      date: this.bookingForm.date,
      numberOfSeats: this.bookingForm.numberOfSeats,
      local: this.bookingForm.local,
      paymentMethod: this.bookingForm.paymentMethod,
      transport: this.bookingForm.transport,
      security: this.bookingForm.security,
      userId: this.bookingForm.userId,
      totalPrice: this.bookingForm.totalPrice,
      foodType: this.bookingForm.foodType,
      decorationType: this.bookingForm.decorationType,
      entertainment: this.bookingForm.entertainment,
      others: this.bookingForm.others
    };

    this.bookingForm.totalPrice = parseFloat(this.calculateTotalPrice());

    this.bookingService.createEvent(bookingFormCopy).subscribe({
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
          panelClass: ['success-snackbar']
        });
      }
    });
  }

 calculateBasePrice(): number {
    let total = 0;

    const selectedLocation = this.locationOptions.find(location => location.value === this.bookingForm.local);
    this.locationPrice = selectedLocation ? selectedLocation.price : 200;
    total += this.locationPrice;

    this.foodPrice = 0;
    this.bookingForm.foodType.forEach(foodType => {
      const selectedFood = this.foodOptions.find(food => food.value === foodType);
      this.foodPrice += selectedFood ? selectedFood.price : 0;
    });
    total += this.foodPrice;

    this.decorationPrice = 0;
    this.bookingForm.decorationType.forEach(decorationType => {
      const selectedDecoration = this.decorationOptions.find(decoration => decoration.value === decorationType);
      this.decorationPrice += selectedDecoration ? selectedDecoration.price : 0;
    });
    total += this.decorationPrice;

    this.entertainmentPrice = 0;
    this.bookingForm.entertainment.forEach(entertainmentType => {
      const selectedEntertainment = this.entertainmentOptions.find(entertainment => entertainment.value === entertainmentType);
      this.entertainmentPrice += selectedEntertainment ? selectedEntertainment.price : 0;
    });
    total += this.entertainmentPrice;

    this.otherPrice = 0;
    this.bookingForm.others.forEach(otherType => {
      const selectedOther = this.otherOptions.find(other => other.value === otherType);
      this.otherPrice += selectedOther ? selectedOther.price : 0;
    });
    total += this.otherPrice;

    if (this.bookingForm.transport) total += 100;
    if (this.bookingForm.security) total += 100;

    return total;
  }

  calculateTotalPrice(): string {
    const guests = this.bookingForm.numberOfSeats;
    const guestMultiplier = guests * 5;

    const basePrice = this.calculateBasePrice();
    const totalPrice = basePrice + guestMultiplier;

    return totalPrice.toFixed(2);
  }
}
