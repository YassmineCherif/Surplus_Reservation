import { User } from "./User";

export interface Surplus {
  id?: number;  
  titre?: string;
  description?: string;
  photos?: string[];  
  dateExpiration?: string;  
  donateur?: { login: string };  // donateur will always have a 'login' as a string
  creerpar?: string;
  reserved?: boolean;

}
