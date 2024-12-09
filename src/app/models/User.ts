export enum Roles {
  DONATEUR = 'DONATEUR',
  ADMIN = 'Admin',
  BENEFICIAIRE = 'BENEFICIAIRE',
  DEFAULT = 'Default',
}

export interface User {
  iduser?: number;
  nom?: string;
  prenom?: string;
  email: string;
  numtel?: string;
  login: string;
  mdp: string; 
  role?: Roles;

}