export class Reservation {
    id?: number;
    surplusId?: number;
    surplusTitle?: string; 
    beneficiaire?: { nom: string; prenom: string };  // Add beneficiaire object
    login?: string;
    dateReservation?: Date;
    reponse?: boolean;
  }
  