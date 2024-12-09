import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/User';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loginUrl = 'http://localhost:9090/users/login'; 
  private registerUrl = 'http://localhost:9090/users/register'; 
  private apiUrl = 'http://localhost:9090/users'; 

  constructor(private http: HttpClient) {}

  login(loginEmail: string, password: string): Observable<{ message: string, role: string }> {
    const params = new HttpParams()
      .set('loginEmail', loginEmail)
      .set('password', password);
      
    return this.http.post<{ message: string, role: string }>(this.loginUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'json'
    }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return of({ message: 'Login failed', role: '' });
      })
    );
  }

  register(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.registerUrl, user).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return of({ message: 'Registration failed' });
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password/${email}`, {});
  }

  getUserProfile(login: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.apiUrl}/profile/${login}`).pipe(
      catchError((error) => {
        console.error('Get profile error:', error);
        return of(null);
      })
    );
  }

  updateUserProfile(login: string, user: User): Observable<{ message: string }> {
    const payload = {
      email: user.email,
      numtel: user.numtel,
      login: user.login,
      ...(user.mdp && { mdp: user.mdp })
    };
  
    return this.http.put<{ message: string }>(`${this.apiUrl}/profile/${login}`, payload).pipe(
      tap(response => {
        console.log('Update profile response:', response);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Update profile error:', error);
        if (error.status === 200 && error.error && typeof error.error === 'string') {
          return of({ message: error.error });
        }
        return throwError(() => new Error('Profile update failed'));
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.iduser}`, user);
  }
}
