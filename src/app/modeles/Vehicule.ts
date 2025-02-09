
import {Carburant} from './Carburant';

export class Vehicule {
  carburants?: Carburant[]|null;
  commentaire: string;
  date?: string|null;
  disponible?: boolean|null;
  id?: number|null;
  immatriculation: string;
  modele: string;


  constructor(carburants: Carburant[], commentaire: string, date: string, disponible: boolean, id: number, immatriculation: string, modele: string) {
    this.carburants = carburants;
    this.commentaire = commentaire;
    this.date = date;
    this.disponible = disponible;
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
  }
  static fromJson(json: any): Vehicule {
    return new Vehicule(
      json.carburants || [],
      json.commentaire || '',
      json.date || '',
      json.disponible ,
      json.id || 0,
      json.immatriculation || '',
      json.modele || ''
    );
  }
  toJson(): any {
    return {
      carburants: this.carburants,
      commentaire: this.commentaire,
      date: this.date,
      disponible: this.disponible,
      id: this.id,
      immatriculation: this.immatriculation,
      modele: this.modele
    };
  }

}
