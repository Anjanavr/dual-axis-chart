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
            labels: {
                'X': 'Date',
                'Y': ['Temperature(°C)', 'Humidity(%)']
            },
            data: this.csvRecords
        };
        this.chartComponent.chartConfig = this.chartConfig;
        this.chartComponent.drawChart();
    }
}
