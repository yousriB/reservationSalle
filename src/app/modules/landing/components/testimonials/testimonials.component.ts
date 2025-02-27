import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: false,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
 // Dynamic Data for Testimonials
 testimonials = [
  { text: 'Ellayali made my wedding magical! Everything was perfect.', name: 'Sarah M.', role: 'Bride', rating: '⭐⭐⭐⭐⭐' },
  { text: 'Best catering service ever! The food was amazing.', name: 'Ahmed K.', role: 'Event Host', rating: '⭐⭐⭐⭐⭐' },
  { text: 'Their decoration team transformed our venue beautifully!', name: 'Lisa T.', role: 'Event Planner', rating: '⭐⭐⭐⭐⭐' },
  { text: 'The best event planning service I’ve ever used.', name: 'Michael B.', role: 'CEO', rating: '⭐⭐⭐⭐⭐' }
];

// Current testimonial index
currentIndex = 0;

// Move to the previous testimonial
prevTestimonial() {
  this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.testimonials.length - 1;
}

// Move to the next testimonial
nextTestimonial() {
  this.currentIndex = (this.currentIndex < this.testimonials.length - 1) ? this.currentIndex + 1 : 0;
}
}
