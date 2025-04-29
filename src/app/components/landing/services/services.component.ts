import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
    {
      title: 'Food & Catering',
      description: 'Delicious menus for every palate',
      details: 'From gourmet dishes to casual bites, we cater to your event’s needs with customizable options.',
      icon: 'fas fa-utensils'
    },
    {
      title: 'Decoration',
      description: 'Beautiful event aesthetics',
      details: 'Transform your space with creative and elegant decorations tailored to your theme.',
      icon: 'fas fa-flower'
    },
    {
      title: 'Transport',
      description: 'Seamless guest logistics',
      details: 'Reliable transportation services to ensure your guests arrive comfortably and on time.',
      icon: 'fas fa-bus'
    },
    {
      title: 'Entertainment',
      description: 'Unforgettable performances',
      details: 'Live music, DJs, or special acts to keep your guests engaged and entertained.',
      icon: 'fas fa-music'
    },
    {
      title: 'Venue Styling',
      description: 'Stunning visual setups',
      details: 'Unique decor solutions to elevate your venue’s ambiance and wow your attendees.',
      icon: 'fas fa-paint-brush'
    },
    {
      title: 'Security',
      description: 'Peace of mind guaranteed',
      details: 'Professional security services to ensure your event runs smoothly and safely.',
      icon: 'fas fa-shield-alt'
    }
  ];

  getIconClass(icon: string): string {
    return icon; // Assumes Font Awesome or similar icon library is included
  }
}
