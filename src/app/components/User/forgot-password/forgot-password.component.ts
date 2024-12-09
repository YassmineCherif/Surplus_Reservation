import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string | null = null; // To store error messages

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter your email address.';
      return;
    }
    this.userService.forgotPassword(this.email).subscribe(
      response => {
        console.log('Password reset email sent', response);
        alert('A password reset email has been sent. Please check your email.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error sending password reset email', error);
        if (error.status === 404) {
          this.errorMessage = "Mail doesn't exist. Please try again";
        } else if (error.status === 200) {
          alert('A password reset email has been sent. Please check your email.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  // Method to clear the error message when user starts typing
  onEmailInput(): void {
    this.errorMessage = null;
  }
}
