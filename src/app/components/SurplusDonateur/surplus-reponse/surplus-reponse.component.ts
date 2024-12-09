import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/ReservationService';
import { Reservation } from '../../../models/Reservation';

@Component({
  selector: 'app-surplus-reponse',
  templateUrl: './surplus-reponse.component.html',
  styleUrls: ['./surplus-reponse.component.css']
})

export class SurplusReponseComponent implements OnInit {
  surplusId!: number;  // Non-null assertion
  surplusTitle: string | undefined = ''; // Default to an empty string if needed
  reservations: Reservation[] = [];

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.surplusId = +id;
        this.loadReservations();
      } else {
        console.error('Surplus ID not found');
      }
    });
  }

  loadReservations(): void {
    this.reservationService.getReservationBySurplussId(this.surplusId).subscribe(
      (reservations: Reservation[]) => {
        console.log('Reservations received:', reservations);  // Log the received data
        this.reservations = reservations;
        this.surplusTitle = reservations.length > 0 ? reservations[0].surplusTitle : 'Unknown';
      },
      (error: any) => {
        console.error('Error fetching reservations:', error);
        this.reservations = []; // Ensure we clear the list if there's an error
      }
    );
  }
  
  


  // Update the method signature to accept 'boolean | null | undefined'
  getResponseText(reponse: boolean | null | undefined): string {
    if (reponse === true) {
      return 'Accepté';
    } else if (reponse === false) {
      return 'Refusé';
    }else {
      return 'En attente'; 
    }
  }

 
  respondToReservation(reservation: Reservation, reponse: boolean): void {
    if (reservation.id !== undefined) {
      this.reservationService.respondToReservation(reservation.id, reponse).subscribe(
        (updatedReservation) => {
          console.log(`Reservation ${reservation.id} updated with response: ${reponse}`);
          if (reponse === false) {
            this.updateSurplusReserved(reservation.id ?? 0, false);   
          }
          this.loadReservations(); // Reload reservations after updating
        },
        (error) => {
          console.error('Error updating reservation:', error);
        }
      );
    } else {
      console.error('Reservation ID is undefined.');
    }
  }
  
  // Method to update surplusReserved to false
  updateSurplusReserved(reservationId: number, surplusReserved: boolean): void {
    this.reservationService.updateSurplusReserved(reservationId, surplusReserved).subscribe(
      (updatedSurplus) => {
        console.log(`Surplus reserved status updated: ${surplusReserved}`);
      },
      (error) => {
        console.error('Error updating surplusReserved:', error);
      }
    );
  }
  

  
}