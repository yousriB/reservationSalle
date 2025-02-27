import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {



  // Dynamic Data for Why Choose Us
  stats = [
    { value: '500+', label: 'Successful Events' },
    { value: '10+', label: 'Years of Experience' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '5⭐', label: 'Rated Service' }
  ];

  // Dynamic Data for Pricing Plans
  pricingPlans = [
    { plan: 'Basic', features: 'Catering + Basic Decor', price: '$500' },
    { plan: 'Premium', features: 'Full Event + Live Entertainment', price: '$1200' }
  ];



  // Dynamic Data for FAQs
  faqs = [
    { question: 'Can I customize my event?', answer: 'Yes, we offer custom themes.' }
  ];

}
