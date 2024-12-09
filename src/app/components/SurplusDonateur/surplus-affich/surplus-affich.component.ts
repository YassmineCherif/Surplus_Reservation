import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SurplusService } from '../../../services/SurplusService';
import { Surplus } from '../../../models/Surplus';
import { AuthService } from '../../../services/auth-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ReservationService } from '../../../services/ReservationService';
@Component({
  selector: 'app-surplus-list',
  templateUrl: './surplus-affich.component.html',
  styleUrls: ['./surplus-affich.component.css'],
})
export class SurplusListComponent implements OnInit, OnDestroy {
  surpluses: Surplus[] = []; // All surpluses
  filteredSurpluses: Surplus[] = []; // Filtered surpluses based on search
  searchTerm: string = ''; // Search term to filter the list
  private destroy$ = new Subject<void>(); // Used for unsubscribing

  constructor(
    private surplusService: SurplusService,
    private reservationService : ReservationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch all surpluses when the component is initialized
    this.surplusService.getSurpluses().pipe(takeUntil(this.destroy$)).subscribe((surpluses) => {
      this.surpluses = surpluses;
      this.filteredSurpluses = surpluses; // Set all surpluses initially
      console.log('All surpluses fetched:', this.surpluses);
    });
  }

  // Delete surplus based on ID
  deleteSurplus(id: number | undefined): void {
    if (id !== undefined) {
      this.surplusService.deleteSurplus(id).subscribe(() => {
        this.surpluses = this.surpluses.filter((s) => s.id !== id);
        this.filterSurpluses(); // Re-filter after deletion
      });
    }
  }

  // Filter surpluses based on search term
  filterSurpluses(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    console.log('Filtering surpluses with search term:', this.searchTerm);

    // Filter all surpluses based on the search term
    this.filteredSurpluses = this.surpluses.filter((surplus) => {
      const description = surplus.description?.toLowerCase() || '';
      const titre = surplus.titre?.toLowerCase() || '';
      return description.includes(searchTermLower) || titre.includes(searchTermLower);
    });

    console.log('Filtered surpluses:', this.filteredSurpluses);
  }


// Handle response to the reservation (Yes/No)
respondToReservation(id: number, response: boolean): void {
  if (id !== undefined) {
    // Send the response as a query parameter
    this.reservationService.respondToReservation(id, response).subscribe(
      (updatedReservation) => {
        console.log('Réservation mise à jour:', updatedReservation);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la réservation :', error);
      }
    );
  }
}




  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
