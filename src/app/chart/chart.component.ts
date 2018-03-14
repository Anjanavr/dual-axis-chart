import { Component, OnInit, Input } from '@angular/core';

import Chart from 'chart.js';

declare var Chart: any;
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    chart: any;

    @Input() chartConfig: any;

    constructor() { }

    ngOnInit() {
        // this.drawChart();
    }

    drawChart () {
        this.configChartOptions();
        const canvas = document.getElementById('chart');
        this.chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                label: 'A',
                yAxisID: 'A',
                data: [100, 96, 84, 76, 69]
                }, {
                label: 'B',
                yAxisID: 'B',
                data: [2, 6, 4, 5, 0],
                type: 'line'
                }, {
                    label: 'C',
                    yAxisID: 'A',
                    data: [45, 96, 74, 85, 20]
                }]
            },
            options: {
                scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                    max: 10,
                    min: 0
                    }
                }]
                }
            }
        });
    }
    configChartOptions () {
        this.chartConfig = {
            type: 'bar'
        };
    }

}
