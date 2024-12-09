import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../../services/trace.service';
import { Trace } from '../../../models/trace';

@Component({
  selector: 'app-trace-affich',
  templateUrl: './trace-affich.component.html',
  styleUrls: ['./trace-affich.component.css']
})
export class TraceAffichComponent implements OnInit {
  traces: Trace[] = [];
  filteredTraces: Trace[] = [];
  searchTerm: string = '';
  searchDate: string = ''; // Date to search for traces within the start and end date range
  userRole: string | null = null;

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    this.loadTraces();
    this.userRole = localStorage.getItem('userRole');
  }

  loadTraces(): void {
    this.traceService.getTraces().subscribe(
      (data) => {
        this.traces = data;
        this.filteredTraces = data;
      },
      (error) => {
        console.error('Error fetching traces', error);
      }
    );
  }

  filterTraces(): void {
    const term = this.searchTerm.toLowerCase();
    const searchDate = this.searchDate ? this.parseDate(this.searchDate) : null;

    this.filteredTraces = this.traces.filter(trace => {
      // Convert trace dates to Date objects if they are not already
      const traceDateStart = trace.datedebut instanceof Date ? trace.datedebut : this.parseDate(trace.datedebut);
      const traceDateEnd = trace.datefin instanceof Date ? trace.datefin : this.parseDate(trace.datefin);

      const matchesText = trace.numserie.toLowerCase().includes(term) ||
                          trace.operationn.toLowerCase().includes(term) ||
                          trace.tracee.toLowerCase().includes(term) ||
                          trace.creerpar.toLowerCase().includes(term);

      const matchesDate = searchDate ? 
        (traceDateStart && traceDateEnd ? 
          (searchDate >= traceDateStart && searchDate <= traceDateEnd) : 
          false) : 
        true; // If no date is provided, match all dates

      return matchesText && matchesDate;
    });
  }

  parseDate(dateString: string): Date | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    // Ensure the date object is valid
    return isNaN(date.getTime()) ? null : date;
  }

  deleteTrace(id: number): void {
    if (this.userRole === 'Admin') {
      this.traceService.deleteTrace(id).subscribe(
        () => {
          this.loadTraces();
        },
        (error) => {
          console.error('Error deleting trace', error);
        }
      );
    }
  }

  canCreateTrace(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Testeur';
  }

  canEditTrace(): boolean {
    return this.userRole === 'Admin' || this.userRole === 'Testeur';
  }

  canDeleteTrace(): boolean {
    return this.userRole === 'Admin';
  }
}
