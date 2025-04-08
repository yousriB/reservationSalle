import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;

  // Toggle the mobile menu visibility
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
