import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    constructor() { }

    chartOptions = {
        responsive: true,
        scales: {
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            }, {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
      };
      chartData = [
        { data: [1, 5, 4, 10], label: 'Account A', type: 'line' },
        { data: [120, 455, 100, 340], label: 'Account B' },
        { data: [45, 67, 800, 500], label: 'Account C' }
      ];
      chartLabels = ['January', 'February', 'Mars', 'April'];

    ngOnInit() {
    }

    onChartClick(event) {
        console.log(event);
    }

}
