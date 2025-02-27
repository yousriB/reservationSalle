import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  reservationForm: FormGroup;
  entertainmentSelected: string[] = [];

  locals = ['Hall A', 'Hall B', 'Outdoor Venue', 'Banquet Hall'];
  eventTypes = ['Wedding', 'Conference', 'Birthday Party', 'Concert'];
  foodTypes = ['Buffet', 'Plated Meal', 'Custom Menu'];
  securityOptions = ['Basic Security', 'Armed Guards', 'Surveillance'];
  transportOptions = ['No Transport', 'VIP Shuttle', 'Luxury Cars'];
  decorationTypes = ['Classic', 'Modern', 'Custom Theme'];
  entertainmentOptions = ['DJ', 'Live Band', 'Dancers', 'Magic Show', 'Fireworks'];
  paymentMethods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'];

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10,15}')]],
      local: ['', Validators.required],
      members: ['', Validators.required],
      eventType: ['', Validators.required],
      foodType: ['', Validators.required],
      security: ['', Validators.required],
      transport: ['', Validators.required],
      decoration: ['', Validators.required],
      eventDate: ['', Validators.required],
      duration: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  toggleEntertainment(option: string) {
    const index = this.entertainmentSelected.indexOf(option);
    if (index === -1) {
      this.entertainmentSelected.push(option);
    } else {
      this.entertainmentSelected.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.reservationForm.invalid) return;
    const reservationData = {
      ...this.reservationForm.value,
      entertainment: this.entertainmentSelected
    };
    console.log('Reservation Submitted:', reservationData);
  }

}
