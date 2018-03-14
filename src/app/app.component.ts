import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ChartComponent } from './chart/chart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    @ViewChild(ChartComponent) chartComponent: ChartComponent;
    csvRecords = [];
    chartConfig: any;

    constructor(
    ) { }

    ngAfterViewInit() {
    }

    uploadCompleted(data) {
        this.csvRecords = data;
        this.createChart();
    }

    createChart() {
        this.chartConfig = {
            type: 'bar',
            data: {
                labels: this.csvRecords.map(item => {
                    return item['Date'];
                }),
                datasets: [{
                        label: 'Actual Temp',
                        id: 'Temperature',
                        backgroundColor: 'rgba(217,83,79,0.75)',
                        data: this.csvRecords.map(item => {
                            return parseFloat(item['Actual Temperature(°C)']);
                        }),
                        type: 'bar'
                    }, {
                        label: 'Forecast Temp',
                        id: 'Temperature',
                        backgroundColor: 'rgba(92,184,92,0.75)',
                        data: this.csvRecords.map(item => {
                            return parseFloat(item['Forecast Temperature(°C)']);
                        }),
                        type: 'bar'
                    }, {
                        label: 'Humidity',
                        id: 'Humidity',
                        backgroundColor: 'rgba(151,187,205,0.5)',
                        data: this.csvRecords.map(item => {
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
        this.chartComponent.chartConfig = this.chartConfig;
        this.chartComponent.drawChart(this.chartConfig);
    }
}
