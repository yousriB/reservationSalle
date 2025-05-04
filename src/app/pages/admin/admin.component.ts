import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}
  activeTab: string = 'reservations';  // Default active tab is reservations

  // Set the active tab and pass the selected reservation ID
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      this.router.navigate(['/user']);
    }
  }
}
