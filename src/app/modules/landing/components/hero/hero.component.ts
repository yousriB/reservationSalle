import { Component, OnInit } from '@angular/core';
import { EventService, Event } from '../../.././../services/event.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
