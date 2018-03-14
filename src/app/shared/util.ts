import { Injectable } from '@angular/core';
import * as moment from 'moment';

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
        const csvHeadersArray = csvRecordsArray[0].split(tokenDelimeter);
        for (let i = 1; i < csvRecordsArray.length - 1; i++) {
            const data = csvRecordsArray[i].split(tokenDelimeter);
            if (validateHeaderAndRecordLengthFlag && data.length !== headerLength) {
                if (data === '') {
                    alert('Extra blank line is present at line number ' + i + ', please remove it.');
                    return null;
                } else {
                    alert('Record at line number ' + i + ' contain '
                    + data.length + ' tokens, and is not matching with header length of :' + headerLength);
                    return null;
                }
            }

            const temp = {};
            for (let j = 0; j < data.length; j++) {
                temp[csvHeadersArray[j]] = data[j];
            }
            dataArr.push(temp);
        }
        return dataArr;
    }

    findAverageOfEachDay(records) {
        const temp1 = records.map(item => {
            item['Date'] = moment(item['Date']).utc().format('MM-DD-YYYY');
            return item;
        });
        const datesArr = temp1.forEach((element, index) => {
            if (!datesArr) {
                datesArr.push({'Date': element['Date']});
            } else {
                if (!datesArr.includes(element['Date'])) {
                    datesArr.push(element['Date']);
                }
            }
            if (index === temp1.length - 1) {
                console.log(element);
            }
        });

        console.log(datesArr);
    }
}
