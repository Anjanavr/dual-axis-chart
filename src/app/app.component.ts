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

    constructor(
    ) { }

    ngAfterViewInit() {
    }

    uploadCompleted(data) {
        this.csvRecords = data;
        this.createChart();
    }

    createChart() {
        this.chartComponent.drawChart(this.csvRecords);
    }
}
