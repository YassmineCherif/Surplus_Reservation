import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurplusService } from '../../../services/SurplusService';
import { AuthService } from '../../../services/auth-service.service'; // Import AuthService
import { Surplus } from '../../../models/Surplus';

@Component({
  selector: 'app-surplus-edit',
  templateUrl: './surplus-edit.component.html',
  styleUrls: ['./surplus-edit.component.css'],
})
export class SurplusEditComponent implements OnInit {
  surplus: Surplus = {
    id: 0,
    titre: '',
    description: '',
    creerpar: '',
    dateExpiration: ''
  };

  numSeries: string[] = [];
  users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private surplusService: SurplusService,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.surplusService.getSurplusById(id).subscribe({
      next: (data: Surplus) => {
        this.surplus = data;

        // Set 'creerpar' to the logged-in user's login
        this.authService.userLogin$.subscribe(login => {
          this.surplus.creerpar = login || ''; // Default to an empty string if login is null
        });
      },
      error: (err) => this.errorMessage = err.error.message || 'An error occurred while fetching the surplus.'
    });

    this.surplusService.getUsers().subscribe({
      next: (data: string[]) => this.users = data,
      error: (err) => this.errorMessage = err.message || 'An error occurred while fetching users.'
    });
  }

  updateSurplus(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.surplusService.updateSurplus(id, this.surplus).subscribe({
      next: () => this.router.navigate(['/Surplus/all']),
      error: (err) => this.errorMessage = err.error.message || 'An error occurred while updating the surplus. Please try again later.'
    });
  }
}
