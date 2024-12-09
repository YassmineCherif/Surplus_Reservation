
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
  templateUrl: './surplus-list.component.html',
  styleUrls: ['./surplus-list.component.css'],
})
export class SurplusListBComponent implements OnInit, OnDestroy {
  surpluses: Surplus[] = []; // All surpluses
  filteredSurpluses: Surplus[] = []; // Filtered surpluses based on search
  searchTerm: string = ''; // Search term to filter the list
  private destroy$ = new Subject<void>(); // Used for unsubscribing

  constructor(
    private surplusService: SurplusService,
    private reservationService: ReservationService,
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

  reserverSurplus(id: number | undefined): void {
    if (id === undefined) {
      alert('Invalid surplus ID.');
      return;
    }

    const userLogin = this.authService.getCurrentUserLogin();
    if (userLogin) {
      this.reservationService.createReservationWithLogin(id, userLogin).subscribe({
        next: () => {
          alert('Reservation successful!');
          // After reservation, update the surplus reservation status
          this.surpluses = this.surpluses.map(surplus =>
            surplus.id === id ? { ...surplus, reserved: true } : surplus
          );
        },
        error: (err) => {
          console.error('Reservation failed:', err);
          alert('Reservation failed. Please try again.');
        },
      });
    } else {
      alert('You need to be logged in to reserve.');
    }
  }

  async filterSurpluses(): Promise<void> {
    const searchTermLower = this.searchTerm.toLowerCase();
    console.log('Filtering surpluses with search term:', this.searchTerm);
  
    // Filter all surpluses based on the search term and reservation responses
    this.filteredSurpluses = [];
    for (const surplus of this.surpluses) {
      const description = surplus.description?.toLowerCase() || ''; // Safe access with fallback value
      const titre = surplus.titre?.toLowerCase() || ''; // Safe access with fallback value
  
      // Ensure surplus.id is not undefined before calling the function
      const isReservationValid = surplus.id ? !(await this.isReservationResponded(surplus.id)) : true;
  
      // Filter based on search term and whether the reservation response is valid (i.e., not true)
      if ((description.includes(searchTermLower) || titre.includes(searchTermLower)) && isReservationValid) {
        this.filteredSurpluses.push(surplus);
      }
    }
  
    console.log('Filtered surpluses:', this.filteredSurpluses);
  }
  
  // Check if the reservation associated with the surplus has a reponse = 1async isReservationResponded(surplusId: number): Promise<boolean> {
    async isReservationResponded(surplusId: number): Promise<boolean> {
      const reservations = await this.reservationService.getReservationBySurplusId(surplusId).toPromise();
      console.log('Checking reservation response:', reservations); // Log the reservations array
      
      // Ensure reservations is defined before proceeding
      return reservations?.some(reservation => reservation.reponse === true) ?? false;
    }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}