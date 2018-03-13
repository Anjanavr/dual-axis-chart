import { Component, OnInit } from '@angular/core';

import Chart from 'chart.js';

declare var Chart: any;
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

    chart: any;
    chartConfig: any;

    constructor() { }

    ngOnInit() {
    }

    drawChart (chartConfig) {
        if (!chartConfig) {
            chartConfig = this.configChartOptions();
        }
        const canvas = document.getElementById('chart');
        this.chart = new Chart(canvas, chartConfig);
    }
    configChartOptions () {
        this.chartConfig = {
            type: 'bar',
            data: {
                labels: [0, 1, 2, 3, 4, 5],
                dataSets: [{
                        label: 'Actual Temp',
                        yAxisID: 'Temperature',
                        data: [23, 22, 22, 21, 21, 21]
                    }, {
                        label: 'Forecast Temp',
                        yAxisID: 'Temperature',
                        data: [25.15, 24.43, 24.1, 23.82, 23.63, 23.47]
                    }, {
                        label: 'Humidity',
                        yAxisID: 'Humidity',
                        data: [8, 6, 8, 8, 5, 10],
                        type: 'line'
                    }
                ],
                options: {
                    scales: {
                        yAxes: [{
                            id: 'Temperature',
                            type: 'linear',
                            position: 'left',
                        }, {
                            id: 'Humidity',
                            type: 'linear',
                            position: 'right',
                        }]
                    }
                }
            }
        };
        return this.chartConfig;
    }

}
