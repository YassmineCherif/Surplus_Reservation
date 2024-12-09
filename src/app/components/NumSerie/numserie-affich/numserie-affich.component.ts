import { Component, OnInit } from '@angular/core';
import { NumSerie } from '../../../models/numSerie';
import { NumSerieService } from '../../../services/numserie.service';

@Component({
  selector: 'app-numserie-affich',
  templateUrl: './numserie-affich.component.html',
  styleUrls: ['./numserie-affich.component.css']
})
export class NumSerieAffichComponent implements OnInit {
  numSeries: NumSerie[] = [];
  filteredNumSeries: NumSerie[] = [];
  errorMessage: string | null = null;
  searchTerm: string = '';

  constructor(private numSerieService: NumSerieService) { }

  ngOnInit(): void {
    this.numSerieService.getNumSeries().subscribe({
      next: (data) => {
        this.numSeries = data;
        this.filteredNumSeries = data; // Initialiser les données filtrées avec toutes les données
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while fetching the serial numbers.';
      }
    });
  }

  deleteNumSerie(id: number): void {
    this.numSerieService.deleteNumSerie(id).subscribe({
      next: () => {
        this.numSeries = this.numSeries.filter(numSerie => numSerie.idnumserie !== id);
        this.filterNumseries(); // Appliquer le filtre après suppression
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred while deleting the serial number.';
      }
    });
  }

  filterNumseries(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredNumSeries = this.numSeries.filter(numSerie =>
      numSerie.numeroserie.toLowerCase().includes(searchTermLower) ||
      numSerie.creerpar.toLowerCase().includes(searchTermLower)
    );
  }
}
