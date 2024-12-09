import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurplusService } from '../../../services/SurplusService';
import { AuthService } from '../../../services/auth-service.service';
import { Surplus } from '../../../models/Surplus';

@Component({
  selector: 'app-surplus-create',
  templateUrl: './surplus-create.component.html',
  styleUrls: ['./surplus-create.component.css'],
})
export class SurplusCreateComponent implements OnInit {
  surplus: Surplus = {
    titre: '',
    description: '',
    creerpar: '',
    dateExpiration: '', // Initialize dateexpiration property
    donateur: { login: '' },  // Initialize donateur with a default empty login
  };
  errorMessage: string | null = null;

  constructor(
    private surplusService: SurplusService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Set 'creerpar' to the logged-in user's login
    this.authService.userLogin$.subscribe(login => {
      this.surplus.creerpar = login || ''; // Default to empty string if login is null
      this.surplus.donateur = { login: login || '' };  // Ensure donateur is set correctly
    });
  }

  createSurplus(): void {
    // Ensure all necessary fields are defined before submitting
    this.surplusService.createSurplus(this.surplus).subscribe({
      next: () => {
        this.router.navigate(['/Surplus/all']);
      },
      error: (err) => {
        // Safely extract error message
        console.error(err); // Log error for debugging
        this.errorMessage = err.error?.message || 'There is a problem.';
      }
    });
  }

  
}
