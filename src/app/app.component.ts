import { Component, OnInit, ViewChild } from '@angular/core';

import { AppConstants } from './shared/constants';
import { FileService } from './shared/util';

// import { ChartComponent } from './chart/chart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        AppConstants,
        FileService
    ]
})
export class AppComponent implements OnInit {
    title = 'app';

    @ViewChild('fileImportInput')
    fileImportInput: any;

    csvRecords = [];

    constructor(
        private _fileUtil: FileService
    ) { }

    ngOnInit() { }

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
}
