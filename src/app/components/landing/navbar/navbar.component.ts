import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
