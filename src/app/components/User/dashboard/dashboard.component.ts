import { Component, OnInit } from '@angular/core';
import { Chart, LinearScale, CategoryScale, BarElement, BarController, LineController, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
import { TraceService } from '../../../services/trace.service'; 
import { Trace } from '../../../models/trace';

interface StatCard {
  label: string;
  count: number;
  percentage: number;
  isIncrease: boolean;
  changeText: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  traces: Trace[] = [];
  chart: any;
  pieChart: any;
  selectedDate: string = '';
  statistics: StatCard[] = [];
  operationsData: { labels: string[], data: number[], backgroundColor: string[], borderColor: string[] } = {
    labels: [],
    data: [],
    backgroundColor: [],
    borderColor: []
  };

  constructor(private traceService: TraceService) {}

  ngOnInit(): void {
    Chart.register(
      LinearScale, 
      CategoryScale, 
      BarElement, 
      BarController, 
      LineController, 
      PointElement, 
      LineElement, 
      Title, 
      Tooltip, 
      Legend,
      PieController,
      ArcElement
    );
    this.fetchData();
  }

  fetchData(): void {
    this.traceService.getTraces().subscribe(
      (data: Trace[]) => {
        this.traces = data.map(trace => ({
          ...trace,
          datedebut: new Date(trace.datedebut),
          datefin: new Date(trace.datefin)
        }));

        this.processOperations(); 
        this.generateBarChart();
      },
      (error) => {
        console.error('Error fetching trace data:', error);
      }
    );
  }

  generateSoftColor(index: number): string {
    // Soft pastel colors with high lightness and lower saturation
    const hue = Math.floor((index * 137.5) % 360); // 137.5 is a prime number for good color spread
    return `hsl(${hue}, 50%, 80%)`; // Lightness is high for pastel effect
  }

  processOperations(): void {
    const operationMap: { [key: string]: number } = {};
    
    this.traces.forEach(trace => {
      if (trace.operationn) {
        operationMap[trace.operationn] = (operationMap[trace.operationn] || 0) + 1;
      }
    });

    this.operationsData = {
      labels: Object.keys(operationMap),
      data: Object.values(operationMap),
      backgroundColor: [],
      borderColor: []
    };

    this.operationsData.labels.forEach((_, index) => {
      const color = this.generateSoftColor(index);
      this.operationsData.backgroundColor.push(color);
      this.operationsData.borderColor.push(color.replace('80%)', '100%)')); // Slightly darker border color
    });
  }

  generateBarChart(): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.operationsData.labels,
          datasets: [
            {
              label: 'Number of Serial Numbers',
              data: this.operationsData.data,
              backgroundColor: this.operationsData.backgroundColor,
              borderColor: this.operationsData.borderColor,
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Operations'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Serial Numbers'
              },
              ticks: {
                stepSize: 1 
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context.');
    }
  }


  
  filterByDate(): void {
    if (!this.selectedDate) return;

    const selectedDateObj = new Date(this.selectedDate);
    const countInDateRange = this.traces.filter(trace => selectedDateObj >= trace.datedebut && selectedDateObj <= trace.datefin).length;

    const totalCount = this.traces.length;
    const percentage = totalCount ? (countInDateRange / totalCount) * 100 : 0;

    this.statistics = [
      {
        label: 'Serial Numbers',
        count: countInDateRange,
        percentage: Math.round(percentage * 100) / 100, // Rounded to 2 decimal places
        isIncrease: percentage > 0, // Assuming it's an increase if percentage > 0
        changeText: percentage > 0 ? 'Increase' : 'Decrease'
      }
    ];
  }


}
