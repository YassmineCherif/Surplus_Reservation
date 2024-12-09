import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NumSerieService } from '../../../services/numserie.service';
import { AuthService } from '../../../services/auth-service.service';
import { NumSerie } from '../../../models/numSerie';

@Component({
  selector: 'app-numserie-edit',
  templateUrl: './numserie-edit.component.html',
  styleUrls: ['./numserie-edit.component.css'],
})
export class NumserieEditComponent implements OnInit {
  numSerie: NumSerie = {
    idnumserie: 0,
    numeroserie: '',
    datecreation: new Date(), // Default to current date
    creerpar: ''
  };
  users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private numSerieService: NumSerieService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.numSerieService.getNumSerieById(id).subscribe({
          next: (data: NumSerie) => {
            this.numSerie = data;

            // Set 'creerpar' to the logged-in user's login
            this.authService.userLogin$.subscribe(login => {
              this.numSerie.creerpar = login || ''; // Default to an empty string if login is null
            });
          },
          error: (err) => this.errorMessage = err.message || 'An error occurred while fetching the serial number.'
        });
      }
    });

    this.numSerieService.getUsers().subscribe({
      next: (data: string[]) => this.users = data,
      error: (err) => this.errorMessage = err.message || 'An error occurred while fetching users.'
    });
  }

  updateNumSerie(): void {
    const id = this.numSerie.idnumserie;
    if (id !== undefined) {
      this.numSerieService.updateNumSerie(id, this.numSerie).subscribe({
        next: () => this.router.navigate(['/numserie/all']),
        error: (err) => this.errorMessage = err.message || 'An error occurred while updating the serial number.'
      });
    } else {
      this.errorMessage = 'Serial number ID is not defined.';
    }
  }
}
