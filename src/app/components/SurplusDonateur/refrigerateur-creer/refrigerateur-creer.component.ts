import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefrigerateurService } from '../../../services/refrigerateur.service';
import { AuthService } from '../../../services/auth-service.service';
import { Refrigerateur } from '../../../models/Refrigerateur';

@Component({
  selector: 'app-refrigerateur-creer',
  templateUrl: './refrigerateur-creer.component.html',
  styleUrl: './refrigerateur-creer.component.css'
})
export class RefrigerateurCreerComponent {
    refrigerateur: Refrigerateur = {
    placesDisponibles: 0,
    imageUrl: '',
    creerpar: '',
     donateur: { login: '' },  // Initialize donateur with a default empty login
  };
  errorMessage: string | null = null;

  constructor(
    private refrigerateurService: RefrigerateurService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Set 'creerpar' to the logged-in user's login
    this.authService.userLogin$.subscribe(login => {
      this.refrigerateur.creerpar = login || ''; // Default to empty string if login is null
      this.refrigerateur.donateur = { login: login || '' };  // Ensure donateur is set correctly
    });
  }

  createRefrigerateur(): void {
    // Ensure all necessary fields are defined before submitting
    this.refrigerateurService.addRefrigerateur(this.refrigerateur).subscribe({
      next: () => {
        this.router.navigate(['/refrigerateur/list']);
      },
      error: (err) => {
        // Safely extract error message
        console.error(err); // Log error for debugging
        this.errorMessage = err.error?.message || 'There is a problem.';
      }
    });
  }

  
}
