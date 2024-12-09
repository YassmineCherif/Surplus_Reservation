import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import * as XLSX from 'xlsx';
import { TraceService } from '../../../services/trace.service';
import { AuthService } from '../../../services/auth-service.service';
import { Trace } from '../../../models/trace';
import { parse } from 'date-fns';

@Component({
  selector: 'app-trace-create',
  templateUrl: './trace-create.component.html',
  styleUrls: ['./trace-create.component.css']
})
export class TraceCreateComponent implements OnInit {
  traces: Trace[] = [];
  currentUserLogin: string = '';
  message: string = ' ';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private traceService: TraceService,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.authService.userLogin$.subscribe(login => {
      this.currentUserLogin = login || ''; // Default to an empty string if login is null
    });
  }

  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);

    if (target.files.length !== 1) {
      console.error('Cannot use multiple files');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = <any[][]>XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.convertToTraces(data);
    };

    reader.readAsBinaryString(target.files[0]);
  }

  // Helper function to convert Excel serial date to JavaScript Date object
  excelDateToJsDate(excelDate: number): Date {
    const baseDate = new Date(1899, 11, 30); // Excel's base date is December 30, 1899
    const days = Math.floor(excelDate);
    const milliseconds = (excelDate - days) * 86400000; // Convert decimal part to milliseconds
    return new Date(baseDate.getTime() + days * 86400000 + milliseconds);
  }

  convertToTraces(data: any[][]): void {
    this.traces = data.slice(1).map(row => {
      // Log the values and types for debugging
      console.log('row[4]', row[4], typeof row[4]);
      console.log('row[5]', row[5], typeof row[5]);
      
      // Convert Excel date serial numbers to JavaScript Date objects
      const dateDebut = row[4] ? this.excelDateToJsDate(row[4]) : new Date();
      const dateFin = row[5] ? this.excelDateToJsDate(row[5]) : new Date();

      return {
        idtrace: row[0],
        datecreation: new Date(), // Current date as a Date object
        creerpar: this.currentUserLogin,
        datedebut: dateDebut,
        datefin: dateFin,
        tracee: row[3],
        numserie: row[1],
        operationn: row[2]
      };
    });
  }

  saveTraces(): void {
    if (this.traces.length > 0) {
      this.traceService.createTraces(this.traces).subscribe(
        () => {
          this.message = 'Traces successfully created';
          this.messageType = 'success';
          // Navigate to /trace/all
          this.router.navigate(['/trace/all']);
        },
        (error) => {
          console.error('Error creating traces', error);
          this.message = 'Error creating traces';
          this.messageType = 'error';
        }
      );
    } else {
      console.error('No traces to save');
      this.message = 'No traces to save';
      this.messageType = 'error';
    }
  }
}
