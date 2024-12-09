import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginEmail: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.login(this.loginEmail, this.password).subscribe({
      next: (response) => {
        if (response.message === 'Login successful') {
          // Store user role and login in AuthService
          this.authService.setLogin(response.role, this.loginEmail);

          // Redirect based on role
          if (response.role === 'Admin') {
            this.router.navigate(['/home']); // Redirect for admin
          } else if (response.role === 'Visiteur' || response.role === 'Testeur') {
            this.router.navigate(['/home']); // Redirect for visiteur/testeur
          } else {
            this.router.navigate(['/home']); // Default redirect
          }

        } else {
          this.errorMessage = response.message; // Display error message from the backend
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed'; // Display error message
      }
    });
  }
}
