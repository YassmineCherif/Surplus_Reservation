import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string>('Default'); // Default role
  private userLoginSubject = new BehaviorSubject<string | null>(null);

  userRole$ = this.userRoleSubject.asObservable();
  userLogin$ = this.userLoginSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const storedRole = localStorage.getItem('userRole') || 'Default'; // Default if not set
    this.userRoleSubject.next(storedRole);
    this.userLoginSubject.next(localStorage.getItem('userLogin'));
  }

  setLogin(userRole: string, userLogin: string) {
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userLogin', userLogin);
    this.userRoleSubject.next(userRole);
    this.userLoginSubject.next(userLogin);
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userLogin');
    this.userRoleSubject.next('Default'); // Reset to Default on logout
    this.userLoginSubject.next(null);
  }

  getCurrentUserLogin(): string | null {
    return this.userLoginSubject.getValue();
  }
  
 
  
  
}
