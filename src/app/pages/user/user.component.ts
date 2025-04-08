import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  activeTab = 'account'; // Default tab

  // Function to change the active tab
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
