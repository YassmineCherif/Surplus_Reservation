import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User'; // Adjust path as needed

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  email: string = '';
  numtel: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  login: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userLogin$.subscribe(login => {
      if (login) {
        this.login = login;
        this.userService.getUserProfile(login).subscribe(profile => {
          if (profile) {
            this.email = profile.email;
            this.numtel = profile.numtel ?? '';
            // Do not set password or confirmPassword from the profile
            this.password = '';
            this.confirmPassword = '';
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.successMessage = null;
      return;
    }
  
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.successMessage = null;
      return;
    }
  
    if (!this.isValidPhoneNumber(this.numtel)) {
      this.errorMessage = 'Phone number must be 8 digits';
      this.successMessage = null;
      return;
    }
  
    if (this.login) {
      const updatedUser: User = {
        email: this.email,
        numtel: this.numtel,
        mdp: this.password,
        login: this.login
      };
  
      this.userService.updateUserProfile(this.login, updatedUser).subscribe({
        next: (response) => {
          if (response.message === 'Profile updated successfully') {
            this.successMessage = 'Profile is up to date!';
            this.errorMessage = null;
          } else {
            this.errorMessage = response.message;
            this.successMessage = null;
          }
        },
        error: (error) => {
          console.error('Error status:', error.status);
          console.error('Error body:', error.error);
          this.errorMessage = 'Profile update failed';
          this.successMessage = null;
        }
      });
      
    }
  }
  

  isValidEmail(email: string): boolean {
    const emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[0-9]{8}$/;
    return phoneRegex.test(phone);
  }
}
