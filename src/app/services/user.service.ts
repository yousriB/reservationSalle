import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users'; // Adjust to your API base URL

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(name: string, email: string, phoneNumber: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, phoneNumber, password });
  }
  
  // Login a user
// UserService (assuming you are using Angular service)
loginUser(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
    tap(response => {
      // Save the JWT token, role, and user ID to localStorage
      if (response.token && response.role && response.id) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.id);
      }
    })
  );
}

  // Get current user info
  getCurrentUser(userId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`,{params:{userId}});
  }

  // Function to update user details
  updateUser(userId: string, name: string, email: string, phoneNumber: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/update/${userId}`;

    const body = {
      name,
      email,
      phoneNumber,
      password,
    };

    // Send PUT request to the backend with the updated user data
    return this.http.put<any>(url, body);
  }


  isLoggedIn(){
    let token = localStorage.getItem('token');
    if (token) {
      return true
    }else{
      return false
    }

  }

  getAuthorDataFromToken(){
    let token = localStorage.getItem('token');
    if (token) {
      let data = JSON.parse(window.atob(token.split('.')[1]))
      return data;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('token');
  }

}
