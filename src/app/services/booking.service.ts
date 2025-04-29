import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/events'; // Adjust to your API base URL

  constructor(private http: HttpClient) { }

  createEvent(event: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, event);
  }
}
