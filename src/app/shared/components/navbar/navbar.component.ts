import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuOpen = false;  // Mobile menu state

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getRole();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  getRole(): string | null {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
  
    if (!token) {
      return null;
    }
  
    try {
      // Split the token into its three parts
      const tokenParts = token.split('.');
  
      // The payload is the second part
      const encodedPayload = tokenParts[1];
  
      // Decode the Base64-encoded payload
      const decodedPayload = atob(encodedPayload);
  
      // Parse the decoded payload as JSON
      const payload = JSON.parse(decodedPayload);
  
      // Extract and return the role
      return payload.user.role;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
