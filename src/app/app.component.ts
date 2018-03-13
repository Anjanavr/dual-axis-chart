import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { AppConstants } from './shared/constants';
import { FileService } from './shared/util';
import { ChartComponent } from './chart/chart.component';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        AppConstants,
        FileService
    ]
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    @ViewChild('fileImportInput')
    fileImportInput: any;
    @ViewChild (ChartComponent) chartComponent: ChartComponent;
    csvRecords = [];
    chartConfig: any;
    constructor(
        private _fileUtil: FileService
    ) { }

    ngAfterViewInit() { }

    // METHOD CALLED WHEN CSV FILE IS IMPORTED
    fileChangeListener($event): void {

        const text = [];
        const files = $event.srcElement.files;

        if (AppConstants.validateHeaderAndRecordLengthFlag) {
            if (!this._fileUtil.isCSVFile(files[0])) {
                alert('Please import valid .csv file.');
                this.fileReset();
            }
        }

        const input = $event.target;
        const reader = new FileReader();
        reader.readAsText(input.files[0]);

        reader.onload = (data) => {
            const csvData = reader.result;
            const csvRecordsArray = csvData.split(/\r\n|\n/);

            let headerLength = -1;
            if (AppConstants.isHeaderPresentFlag) {
                const headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, AppConstants.tokenDelimeter);
                headerLength = headersRow.length;
            }
            this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
                headerLength, AppConstants.validateHeaderAndRecordLengthFlag, AppConstants.tokenDelimeter);
            if (this.csvRecords == null) {
                // If control reached here it means csv file contains error, reset file.
                this.fileReset();
            } else {
                this.createChart();
            }
        };

        reader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
        };
    }

    fileReset() {
        this.fileImportInput.nativeElement.value = '';
        this.csvRecords = [];
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
