import { Component } from '@angular/core';

@Component({
  selector: 'app-services-management',
  standalone: false,
  templateUrl: './services-management.component.html',
  styleUrl: './services-management.component.css'
})
export class ServicesManagementComponent {
  services = [
    { name: 'Photography', description: 'Professional photography services', price: '$1,200', category: 'Photography' },
    { name: 'Catering', description: 'Delicious food and beverages', price: '$2,500', category: 'Catering' },
    { name: 'Decoration', description: 'Beautiful decorations for your venue', price: '$1,800', category: 'Decorations' },
  ];

  newService = { name: '', description: '', price: '', category: '' };

  // Add a new service
  addService() {
    if (this.newService.name && this.newService.description && this.newService.price && this.newService.category) {
      this.services.push({ ...this.newService });
      this.newService = { name: '', description: '', price: '', category: '' }; // Reset form
    }
  }

  // Handle delete service
  deleteService(serviceName: string) {
    this.services = this.services.filter(service => service.name !== serviceName);
  }
}
