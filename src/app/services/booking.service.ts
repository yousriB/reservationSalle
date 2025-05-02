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
  getEventsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }
  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }
  updateEventStatus(id: string, status: string): Observable<any> {
    const body = { status };  // Wrap the status in an object
    return this.http.put<any>(`${this.apiUrl}/status/${id}`, body);  // Send the object
  }
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
