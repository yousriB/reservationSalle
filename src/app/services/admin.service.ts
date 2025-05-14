import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '//localhost:3000/api/admin';


  constructor(private http: HttpClient) {}

  // Food Options
  getFoodOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/food-options`);
  }

  addFoodOption(food: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/food-options`, food);
  }

  updateFoodOption(food: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/food-options/${food.value}`, food);
  }

  deleteFoodOption(value: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/food-options/${value}`);
  }

  // Location Options
  getLocationOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/location-options`);
  }

  addLocationOption(location: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/location-options`, location);
  }

  updateLocationOption(location: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/location-options/${location.value}`, location);
  }

  deleteLocationOption(value: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/location-options/${value}`);
  }

  // Decoration Options
  getDecorationOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/decoration-options`);
  }

  addDecorationOption(decoration: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/decoration-options`, decoration);
  }

  updateDecorationOption(decoration: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/decoration-options/${decoration.value}`, decoration);
  }

  deleteDecorationOption(value: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/decoration-options/${value}`);
  }

  // Entertainment Options
  getEntertainmentOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/entertainment-options`);
  }

  addEntertainmentOption(entertainment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/entertainment-options`, entertainment);
  }

  updateEntertainmentOption(entertainment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/entertainment-options/${entertainment.value}`, entertainment);
  }

  deleteEntertainmentOption(value: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/entertainment-options/${value}`);
  }

  // Other Options
  getOtherOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/other-options`);
  }

  addOtherOption(other: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/other-options`, other);
  }

  updateOtherOption(other: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/other-options/${other.value}`, other);
  }

  deleteOtherOption(value: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/other-options/${value}`);
  }
}
