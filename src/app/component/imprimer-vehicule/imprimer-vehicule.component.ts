import { Component } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {Vehicule} from '../../modeles/Vehicule';
import {MatIcon} from '@angular/material/icon';
import {VehiculeService} from '../../services/vehicule.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-imprimer-vehicule',
  templateUrl: './imprimer-vehicule.component.html',
  providers:[DatePipe],
  imports: [
    FormsModule,
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./imprimer-vehicule.component.css']
})
export class ImprimerVehiculeComponent {

  date: string = '';
  vehicules: Vehicule[] = [];

  constructor(private service: VehiculeService,private datePipe:DatePipe, private snackBar:MatSnackBar) { }


  rechercherVehiculeDateEnregistrement(date: string) {

    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }
    const formatted = this.datePipe.transform(date, 'dd/MM/yyyy');

    this.service.rechercherVehiculeDateEnregistrement(formatted).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.vehicules=[]
        }else {
          this.vehicules = data.map((data:Partial<Vehicule>)=>Vehicule.fromJson(data))
          this.snackBar.open(`La liste des présences de véhicule au ${formatted}`,'Fermer',  { duration: 3000 });
        }
      }
    })

  }

  imprimerVehiculeDateEnregistrement(date: string) {
    if (!date) {
      alert('Veuillez sélectionner une date.');
      return;
    }

    const formatted = this.datePipe.transform(date,'dd/MM/yyyy');
    if (formatted){
      this.service.imprimerVehiculeDateEnregistrement(formatted).subscribe({
        next:response => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `La_liste_des_véhicules_du_${date}.pdf`;
          a.click();

          window.URL.revokeObjectURL(url);

          this.snackBar.open('Le PDF est en téléchargement.', 'Fermer', { duration: 3000 });

        },
        error:err => this.snackBar.open('Erreur de chargement'+err,'Fermer',{duration:3000})
      })
    }

  }

  edit(id: number | null | undefined) {

  }

  delete(id: number | null | undefined) {

  }
}
