import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-formulaire',
  standalone: false,
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  reservationForm: FormGroup;
  entertainmentSelected: string[] = [];

  locals = ['salle 1', 'salle2', 'home'];
  eventTypes = ['birthday', 'marriage'];
  foodTypes = ['Buffet', 'Plated Meal', 'Custom Menu'];
  decorationTypes = ['Classic', 'Modern', 'Custom Theme'];
  entertainmentOptions = ['dj', 'magic show', 'fire work', 'dancer'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService // Inject EventService
  ) {
    this.reservationForm = this.fb.group({
      title: ['', Validators.required],
      time: ['', Validators.required],
      date: ['', Validators.required],
      numberOfSeats: ['', Validators.required],
      typeEvent: ['', Validators.required],
      foodType: ['', Validators.required],
      decorationType: ['', Validators.required],
      transport: ['', Validators.required],
      security: ['', Validators.required],
      entertainment: [[]],
    });
  }

  toggleEntertainment(option: string) {
    const entertainment = this.reservationForm.get('entertainment')?.value || [];
    const index = entertainment.indexOf(option);
    if (index === -1) {
      entertainment.push(option);
    } else {
      entertainment.splice(index, 1);
    }
    this.reservationForm.get('entertainment')?.setValue(entertainment);
  }

  onSubmit() {
    const reservationData = this.reservationForm.value;

    this.eventService.createEvent(reservationData).subscribe(
      (response) => {
        console.log('Event created successfully:', response);
        // Optionally, navigate to a success page or display a success message
      },
      (error) => {
        console.error('Error creating event:', error);
        // Optionally, display an error message to the user
      }
    );
  }
}
