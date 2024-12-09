import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService  {
  private apiUrl = 'http://localhost:9090/reservations';

  constructor(private http: HttpClient) { }


  createReservationWithLogin(surplusId: number, login: string): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/${surplusId}/${login}`, {});
  }
  
  respondToReservation(reservationId: number, reponse: boolean): Observable<Reservation> {
    const params = new HttpParams().set('reponse', reponse.toString()); 
    return this.http.put<Reservation>(`${this.apiUrl}/${reservationId}/reponse`, null, { params });
  }
  

  getReservationBySurplusId(surplusId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/surplus/${surplusId}`);
  }

  getReservationBySurplussId(surplusId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/surpluss/${surplusId}`);
  }
  

  updateSurplusReserved(reservationId: number, surplusReserved: boolean): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${reservationId}/surplusReserved`, { surplusReserved });
  }


  checkSurplusEligibility(surplusId: number, login: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/surplus/${surplusId}/eligible`, { params: { login } });
}

  

}
