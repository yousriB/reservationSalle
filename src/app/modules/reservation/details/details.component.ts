import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  reservationData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch reservation data from router state
    this.reservationData = history.state;
  }
  goBack() {
    window.history.back();
  }
}
