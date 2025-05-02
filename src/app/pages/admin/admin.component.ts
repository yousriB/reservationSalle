import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  activeTab: string = 'reservations';  // Default active tab is reservations

  // Set the active tab and pass the selected reservation ID
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
