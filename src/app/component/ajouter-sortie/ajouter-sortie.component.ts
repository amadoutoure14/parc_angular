import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Affectation } from '../../modeles/Affectation';
import {DatePipe, NgForOf} from '@angular/common';
import { AffectationService } from '../../services/affectation.service';
import { SortieService } from '../../services/sortie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sortie } from '../../modeles/Sortie';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-ajouter-sortie',
  providers: [DatePipe],
  templateUrl: './ajouter-sortie.component.html',
  imports: [
    MatOption,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    NgForOf,
    MatButton,
    MatLabel
  ],
  styleUrl: './ajouter-sortie.component.css'
})
export class AjouterSortieComponent implements OnInit {
  affectations: Affectation[] = [];
  sortieForm!: FormGroup;

  constructor(
    private affectationService: AffectationService,
    private service: SortieService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.sortieForm = this.fb.group({
      affectation: [null, Validators.required],
      objet: ['', Validators.required],
      destination: ['', Validators.required],
      lieu_depart: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
    });

    this.affectationService.listeAffectations().subscribe({
      next: (data) => {
        this.affectations = data.affectation;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des affectations", err);
        this.showSnackbar("Erreur lors du chargement des affectations.");
      }
    });
  }

  onSubmit() {
    if (this.sortieForm.invalid) {
      this.showSnackbar('Veuillez remplir tous les champs requis.');
      return;
    }

    const sortie: Sortie = this.sortieForm.value;

    this.service.enregistrer(sortie).subscribe({
      next: (response) => {
        this.showSnackbar(response.message || 'Sortie enregistrée avec succès.');
        this.sortieForm.reset();
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement", err);
        const message = err.error?.message || "Erreur lors de l'enregistrement.";
        this.showSnackbar(message);
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Fermer', { duration: 3000 });
  }
}

