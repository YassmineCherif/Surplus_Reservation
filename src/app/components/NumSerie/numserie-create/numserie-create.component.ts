import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NumSerieService } from '../../../services/numserie.service';
import { AuthService } from '../../../services/auth-service.service'; // Import AuthService
import { NumSerie } from '../../../models/numSerie';

@Component({
  selector: 'app-numserie-create',
  templateUrl: './numserie-create.component.html',
  styleUrls: ['./numserie-create.component.css'],
})
export class NumSerieCreateComponent implements OnInit {
  numSerie: NumSerie = {
    numeroserie: '',
    creerpar: ''
  };
  errorMessage: string | null = null;

  constructor(
    private numSerieService: NumSerieService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    // Get the logged-in user's login and set creerpar
    this.authService.userLogin$.subscribe(login => {
      // Handle the case where login might be null
      this.numSerie.creerpar = login || ''; // Default to an empty string if login is null
    });
  }

  createNumSerie(): void {
    this.numSerieService.createNumSerie(this.numSerie).subscribe({
      next: () => {
        this.router.navigate(['/numserie/all']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'The serial number already exists.';
      }
    });
  }
}
