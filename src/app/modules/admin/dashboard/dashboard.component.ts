import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalUsers: number = 120;
  totalReservations: number = 45;
  totalEarnings: number = 8540;
  pendingApprovals: number = 5;

  recentReservations = [
    { name: "John Doe", eventType: "Wedding", date: "2024-03-01", status: "Approved" },
    { name: "Alice Smith", eventType: "Birthday Party", date: "2024-03-05", status: "Pending" },
    { name: "Michael Johnson", eventType: "Conference", date: "2024-03-08", status: "Rejected" },
    { name: "Emily Davis", eventType: "Engagement", date: "2024-03-12", status: "Approved" }
  ];

  constructor() {}

  ngOnInit(): void {}
}
