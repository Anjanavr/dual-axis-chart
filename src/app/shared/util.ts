import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

    constructor() {}

    isCSVFile(file) {
        return file.name.endsWith('.csv');
    }

    getHeaderArray(csvRecordsArr, tokenDelimeter) {
        const headers = csvRecordsArr[0].split(tokenDelimeter);
        const headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    }

    validateHeaders(origHeaders, fileHeaders) {
        if (origHeaders.length !== fileHeaders.length) {
            return false;
        }

        let fileHeaderMatchFlag = true;
        for (let j = 0; j < origHeaders.length; j++) {
            if (origHeaders[j] !== fileHeaders[j]) {
                fileHeaderMatchFlag = false;
                break;
            }
        }
        return fileHeaderMatchFlag;
    }

    getDataRecordsArrayFromCSVFile(csvRecordsArray, headerLength,
        validateHeaderAndRecordLengthFlag, tokenDelimeter) {
        const dataArr = [];
        const headers = csvRecordsArray[0].split(tokenDelimeter);
        for (let i = 1; i < csvRecordsArray.length - 1; i++) {
            const data = csvRecordsArray[i].split(tokenDelimeter);
            if (validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
                if (data === '') {
                    console.log('Extra blank line is present at line number ' + i + ', please remove it.');
                    return null;
                } else {
                    console.log('Record at line number ' + i + ' contain '
                    + data.length + ' tokens, and is not matching with header length of :' + headerLength);
                    return null;
                }
            }

            const temp = {};
            for (let j = 0; j < data.length; j++) {
                temp[headers[j]] = data[j];
            }
            dataArr.push(temp);
        }
        return dataArr;
    }

}
