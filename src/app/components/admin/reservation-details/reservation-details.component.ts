import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-reservation-details',
  standalone: false,
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {
  
  reservationId: string = '';
  reservation: any = null;
  isLoading = true;
  userRole: string = '';
  foodPrices: { foodType: string; label: string; image: string; price: number }[] = [];

  // Configuration data loaded from backend
  foodOptions: any[] = [];
  decorationOptions: any[] = [];
  locationOptions: any[] = [];
  entertainmentOptions: any[] = [];
  paymentMethods = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cash', label: 'Cash' }
  ];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || '';
    this.reservationId = this.route.snapshot.paramMap.get('id') || '';
    if (this.reservationId) {
      this.loadConfigurationData();
    }
  }

  loadConfigurationData(): void {
    // Load all configuration options in parallel
    Promise.all([
      this.adminService.getFoodOptions().toPromise(),
      this.adminService.getDecorationOptions().toPromise(),
      this.adminService.getLocationOptions().toPromise(),
      this.adminService.getEntertainmentOptions().toPromise(),
    ]).then(([food, decor, locations, entertainment]) => {
      this.foodOptions = food || [];
      this.decorationOptions = decor || [];
      this.locationOptions = locations || [];
      this.entertainmentOptions = entertainment || [];
      
      // Now load the reservation details
      this.getReservationDetails(this.reservationId);
    }).catch(error => {
      console.error('Error loading configuration:', error);
      this.isLoading = false;
    });
  }

  getReservationDetails(id: string): void {
    this.bookingService.getEventById(id).subscribe(
      (details: any) => {
        this.reservation = details;
        console.log(this.reservation);
        this.calculateFoodPrices();
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching reservation details:', error);
        this.isLoading = false;
      }
    );
  }

  calculateFoodPrices(): void {
    this.foodPrices = this.reservation.foodType.map((foodType: string) => {
      const option = this.foodOptions.find(opt => opt.value === foodType);
      return {
        foodType: foodType,
        label: this.getFoodLabel(foodType),
        image: this.getFoodImage(foodType),
        price: option ? option.price : 0
      };
    });
  }

  // Helper methods to get labels and images
  getFoodLabel(value: string): string {
    const option = this.foodOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  getFoodImage(value: string): string {
    const option = this.foodOptions.find(opt => opt.value === value);
    return option ? option.image : 'assets/images/default-food.jpg';
  }

  getDecorationLabel(value: string): string {
    const option = this.decorationOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  getDecorationImage(value: string): string {
    const option = this.decorationOptions.find(opt => opt.value === value);
    return option ? option.image : 'assets/images/default-decor.jpg';
  }

  getLocationLabel(value: string): string {
    const option = this.locationOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  getLocationImage(value: string): string {
    const option = this.locationOptions.find(opt => opt.value === value);
    return option ? option.image : 'assets/images/default-location.jpg';
  }

  getLocationCapacity(value: string): number {
    const option = this.locationOptions.find(opt => opt.value === value);
    return option ? option.capacity : 0;
  }

  getEntertainmentLabel(value: string): string {
    const option = this.entertainmentOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  }
  
  getEntertainmentImage(value: string): string {
    const option = this.entertainmentOptions.find(opt => opt.value === value);
    return option ? option.image : 'assets/images/default-entertainment.jpg';
  }

  getPaymentMethodLabel(value: string): string {
    const option = this.paymentMethods.find(opt => opt.value === value);
    return option ? option.label : value;
  }

  approveReservation(): void {
    if (!this.reservation) return;
    
    this.bookingService.updateEventStatus(this.reservation._id, 'Approved').subscribe(
      () => {
        this.reservation.status = 'Approved';
        // Optional: Show success message
      },
      (error: any) => {
        console.error('Error approving reservation:', error);
        // Optional: Show error message
      }
    );
  }

  rejectReservation(): void {
    if (!this.reservation) return;
    
    this.bookingService.updateEventStatus(this.reservation._id, 'Rejected').subscribe(
      () => {
        this.reservation.status = 'Rejected';
        // Optional: Show success message
      },
      (error: any) => {
        console.error('Error rejecting reservation:', error);
        // Optional: Show error message
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
