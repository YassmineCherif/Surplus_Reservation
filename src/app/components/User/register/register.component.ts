import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth-service.service';
import { Roles } from '../../../models/User'; // Make sure Roles is imported
import { User } from '../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  login = '';
  numtel: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: Roles = Roles.DONATEUR; // Default to DONATEUR, use the Roles enum
  errorMessage: string | null = null;
  passwordMismatch: boolean = false;
  invalidEmail: boolean = false;
  invalidPhoneNumber: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    this.invalidEmail = !this.validateEmail(this.email);
    this.invalidPhoneNumber = !this.validatePhoneNumber(this.numtel);

    if (this.passwordMismatch || this.invalidEmail || this.invalidPhoneNumber) {
      return; // Stop submission if validation fails
    }

    const newUser: User = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      numtel: this.numtel,
      login: this.login,
      mdp: this.password,
      role: this.role // Use the Roles enum
    };

    this.userService.register(newUser).subscribe({
      next: (response) => {
        if (response.message === 'Registration successful') {
          this.router.navigate(['/login']); // Redirect to login after successful registration
        } else {
          this.errorMessage = response.message; // Display error message from the backend
        }
      },
      error: (error) => {
        this.errorMessage = 'Registration failed'; // Display error message
      }
    });
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email regex
  }

  private validatePhoneNumber(numtel: string): boolean {
    return /^[0-9]{8}$/.test(numtel); // Validate 8 numeric characters
  }
}
