import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RefrigerateurService } from '../../../services/refrigerateur.service';
import { Refrigerateur } from '../../../models/Refrigerateur';
import { AuthService } from '../../../services/auth-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mesrefrigerateur',
  templateUrl: './mesrefrigerateur.component.html',
  styleUrls: ['./mesrefrigerateur.component.css']
})
export class MesrefrigerateurComponent implements OnInit, OnDestroy {
  refrigerateurs: Refrigerateur[] = []; // All refrigerateurs
  filteredRefrigerateurs: Refrigerateur[] = []; // Filtered refrigerateurs based on search
  searchTerm: string = ''; // Search term to filter the list
  private destroy$ = new Subject<void>(); // Used for unsubscribing

  constructor(
    private refrigerateurService: RefrigerateurService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch all refrigerateurs when the component is initialized
    this.refrigerateurService.getRefrigerateurs().pipe(takeUntil(this.destroy$)).subscribe((refrigerateurs) => {
      this.refrigerateurs = refrigerateurs;
      this.filteredRefrigerateurs = refrigerateurs; // Set all refrigerateurs initially
      console.log('All refrigerateurs fetched:', this.refrigerateurs);
    });
  }

  // Delete refrigerateur based on ID
  deleteRefrigerateur(id: number | undefined): void {
    if (id !== undefined) {
      this.refrigerateurService.deleteRefrigerateur(id).subscribe(() => {
        this.refrigerateurs = this.refrigerateurs.filter((r) => r.id !== id);
        this.filterRefrigerateurs(); // Re-filter after deletion
      });
    }
  }

  // Filter refrigerateurs based on search term
  filterRefrigerateurs(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    console.log('Filtering refrigerateurs with search term:', this.searchTerm);
  
    // Filter all refrigerateurs based on the search term
    this.filteredRefrigerateurs = this.refrigerateurs.filter((refrigerateur) => {
      const imageUrl = refrigerateur.imageUrl?.toLowerCase() || '';
      const donateurName = refrigerateur.donateur
        ? `${refrigerateur.donateur.nom} ${refrigerateur.donateur.prenom}`.toLowerCase()
        : '';
      return imageUrl.includes(searchTermLower) || donateurName.includes(searchTermLower);
    });
  
    console.log('Filtered refrigerateurs:', this.filteredRefrigerateurs);
  }
  

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
