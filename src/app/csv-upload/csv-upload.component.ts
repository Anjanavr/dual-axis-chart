import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileService } from '../shared/util';

const tokenDelimeter = ',';
const isHeaderPresentFlag = true;
const validateHeaderAndRecordLengthFlag = true;
const valildateFileExtenstionFlag = true;

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css'],
  providers: [
    FileService
  ]
})
export class CsvUploadComponent implements OnInit {
    csvRecords = [];
    uploadedData: any;

    @Output() uploadCompleted = new EventEmitter<any>();

    constructor(private _fileUtil: FileService) { }

    ngOnInit() {
    }

    fileChangeListener($event): void {
        const text = [];
        const files = $event.srcElement.files;

        if (validateHeaderAndRecordLengthFlag) {
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
            if (isHeaderPresentFlag) {
                const headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, tokenDelimeter);
                headerLength = headersRow.length;
            }
            this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray,
                headerLength, validateHeaderAndRecordLengthFlag, tokenDelimeter);
            if (this.csvRecords == null) {
                // If control reached here it means csv file contains error, reset file.
                this.fileReset();
            } else {
                this.uploadCompleted.emit(this.csvRecords);
            }
        };

        reader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
        };
    }

    fileReset() {
        this.csvRecords = [];
        this.uploadedData = '';
    }
}
