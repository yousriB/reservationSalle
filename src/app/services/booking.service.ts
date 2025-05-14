import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


interface BookingForm {
  title: string;
  date: string;
  paymentMethod: string;
  foodType: string[];
  decorationType: string[];
  numberOfSeats: number;
  typeEvent: string;
  local: string;
  transport: boolean;
  security: boolean;
  entertainment: string[];
  others: string[];
  userId: string;
  totalPrice: number;
}

interface CreateEventResponse {
  message: string;
  event: {
    id: string;
    title: string;
    date: Date;
    status: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/events'; // Adjust to your API base URL

  constructor(private http: HttpClient) { }

  createEvent(event: BookingForm): Observable<CreateEventResponse> {
    return this.http.post<CreateEventResponse>(`${this.apiUrl}/create`, event).pipe(
      catchError(error => {
        console.error('Error creating event:', error);
        throw error; // Re-throw to let the component handle it
      })
    );
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
  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
