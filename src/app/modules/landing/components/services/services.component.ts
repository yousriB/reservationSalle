import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  // Dynamic Data for Services
  services = [
    { title: 'Event Planning', description: 'From weddings to corporate events, we manage every detail.' },
    { title: 'Catering', description: 'Delicious, custom-made menus tailored to your needs.' },
    { title: 'Decor & Lighting', description: 'Elegant themes with floral and lighting arrangements.' }
  ];
}
