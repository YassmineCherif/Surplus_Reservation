export interface Refrigerateur {
    id?: number;                
    placesDisponibles?: number;  // Number of available places (in KG)
    imageUrl?: string;           // URL for the image of the refrigerator
    creerpar?: string;
    donateur?: {                 // Minimal User object for the donateur
      iduser?: number;   
      login?:string;        // User ID of the donateur
      nom?: string;             // Optional: Name of the donateur
      prenom?: string;          // Optional: First name of the donateur
      numtel?: string;

    };
  }
  