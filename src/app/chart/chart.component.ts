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
    chartConfig: any;

    constructor() { }

    ngOnInit() {
    }

    drawChart (data) {
        if (!data) {
            this.chartConfig = this.configChartOptions();
        } else {
            this.chartConfig = {
                type: 'bar',
                data: {
                    labels: data.map(item => {
                        return item['Date'];
                    }),
                    datasets: [{
                            label: 'Actual Temp',
                            id: 'Temperature',
                            backgroundColor: 'rgba(217,83,79,0.75)',
                            data: data.map(item => {
                                return parseFloat(item['Actual Temperature(°C)']);
                            }),
                            type: 'bar'
                        }, {
                            label: 'Forecast Temp',
                            id: 'Temperature',
                            backgroundColor: 'rgba(92,184,92,0.75)',
                            data: data.map(item => {
                                return parseFloat(item['Forecast Temperature(°C)']);
                            }),
                            type: 'bar'
                        }, {
                            label: 'Humidity',
                            id: 'Humidity',
                            backgroundColor: 'rgba(151,187,205,0.5)',
                            data: data.map(item => {
                                return parseFloat(item['Humidity(%)']);
                            }),
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
                            }],
                            xAxes: [{
                                type: 'time',
                                distribution: 'series'
                            }]
                        }
                    }
                }
            };
        }
        const canvas = document.getElementById('chart');
        this.chart = new Chart(canvas, this.chartConfig);
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
