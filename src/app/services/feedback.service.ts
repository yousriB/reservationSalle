import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedback';

  constructor(private http: HttpClient) { }

  createFeedback(feedback: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, feedback);
  }

  getAllFeedback(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  deleteFeedback(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
