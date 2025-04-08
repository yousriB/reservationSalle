import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  getIconClass(iconName: string): string {
    return `fas fa-${iconName}`;
  }
// Array of services to display in the cards
services = [
  {
    title: 'Photography',
    description: 'Professional photography services to capture your special moments',
    details: 'Our experienced photographers will ensure every beautiful moment is preserved forever.',
    icon: 'camera'
  },
  {
    title: 'Catering',
    description: 'Delicious food and beverages for your guests',
    details: 'From elegant dinners to casual buffets, we provide catering options for every taste and budget.',
    icon: 'utensils'
  },
  {
    title: 'Decoration',
    description: 'Beautiful decorations to transform your venue',
    details: 'Our decoration services include floral arrangements, lighting, table settings, and more.',
    icon: 'calendar'
  }
];
}
