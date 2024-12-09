
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefrigerateurService } from '../../../services/refrigerateur.service';
import { AuthService } from '../../../services/auth-service.service';  
import { Refrigerateur } from '../../../models/Refrigerateur';

@Component({
  selector: 'app-refrigerateur-edit',
  templateUrl: './refrigerateur-edit.component.html',
  styleUrl: './refrigerateur-edit.component.css'
})

export class RefrigerateurEditComponent implements OnInit {
  refrigerateur: Refrigerateur = {
    id: 0,
    placesDisponibles: 0,
    imageUrl: '',
    creerpar: '',
     donateur: { login: '' }, 
  };

   users: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private refrigerateurService: RefrigerateurService,
    private authService: AuthService // Inject AuthService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.refrigerateurService.getRefrigerateurById(id).subscribe({
      next: (data: Refrigerateur) => {
        this.refrigerateur = data;

        // Set 'creerpar' to the logged-in user's login
        this.authService.userLogin$.subscribe(login => {
          this.refrigerateur.creerpar = login || ''; // Default to an empty string if login is null
        });
      },
      error: (err) => this.errorMessage = err.error.message || 'Une erreur sest produite lors de la récupération du refrigerateur.'
    });

    this.refrigerateurService.getUsers().subscribe({
      next: (data: string[]) => this.users = data,
      error: (err) => this.errorMessage = err.message || 'Une erreur sest produite lors de la récupération des utilisateurs.'
    });
  }

  updateRefrigerateur(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.refrigerateurService.updateRefrigerateur(id, this.refrigerateur).subscribe({
      next: () => this.router.navigate(['/refrigerateur/list']),
      error: (err) => this.errorMessage = err.error.message || 'Une erreur sest produite lors de la mise à jour du refrigerateur Veuillez réessayer ultérieurement.'
    });
  }
}
