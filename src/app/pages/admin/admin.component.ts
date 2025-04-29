import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeTab = 'reservations'; // Default tab is 'reservations'

  // Function to change the active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
