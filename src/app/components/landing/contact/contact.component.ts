import { Component } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  feedback={
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    description: ''
  };

  constructor(private feedbackService: FeedbackService) { }

  onSubmit() {
    this.feedbackService.createFeedback(this.feedback).subscribe(
      () => {
        console.log('Feedback submitted successfully');
      },
      (error) => {
        console.error('Error submitting feedback:', error);
      }
    );
  }

}
