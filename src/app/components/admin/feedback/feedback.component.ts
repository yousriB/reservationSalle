import { Component } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbacks: any[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe((feedbacks) => {
      this.feedbacks = feedbacks;
    });
  }

  deleteFeedback(id: string): void {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.getFeedbacks();
    });
  }
}
