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

    // format date to the format we want to show, currently MM-DD-YY
    // Find the average of temperature and humidity on each day
    findAverageOfEachDay(records) {
        let tempArr = [];
        const datesArr = [];
        const temp1 = records.map(item => {
            item['Date'] = moment(item['Date']).utc().format('MM-DD-YYYY');
            if (!datesArr.length) {
                datesArr.push({
                    'Date': item['Date'],
                    'Actual Temperature(°C)': [item['Actual Temperature(°C)']],
                    'Forecast Temperature(°C)': [item['Forecast Temperature(°C)']],
                    'Humidity(%)': [item['Humidity(%)']],
                });
            } else {
                let objExists: any;
                objExists = datesArr.find(ele => {
                    return ele['Date'] === item['Date'];
                });
                if (objExists) {
                    objExists['Actual Temperature(°C)'].push(item['Actual Temperature(°C)']);
                    objExists['Forecast Temperature(°C)'].push(item['Forecast Temperature(°C)']);
                    objExists['Humidity(%)'].push(item['Humidity(%)']);
                } else {
                    datesArr.push({
                        'Date': item['Date'],
                        'Actual Temperature(°C)': [item['Actual Temperature(°C)']],
                        'Forecast Temperature(°C)': [item['Forecast Temperature(°C)']],
                        'Humidity(%)': [item['Humidity(%)']],
                    });
                }
            }
            return item;
        });
        tempArr = datesArr.map(obj => {
            const temp = {
                'Date': obj['Date'],
                'Actual Temperature(°C)': 0,
                'Forecast Temperature(°C)': 0,
                'Humidity(%)': 0
            };
            obj['Actual Temperature(°C)'].forEach(element => {
                temp['Actual Temperature(°C)'] = temp['Actual Temperature(°C)'] + parseFloat(element);
            });
            obj['Forecast Temperature(°C)'].forEach(element => {
                temp['Forecast Temperature(°C)'] = temp['Forecast Temperature(°C)'] + parseFloat(element);
            });
            obj['Humidity(%)'].forEach(element => {
                temp['Humidity(%)'] = temp['Humidity(%)'] + parseFloat(element);
            });
            return temp;
        });
        tempArr = tempArr.map((obj, index) => {
            obj['Actual Temperature(°C)'] = obj['Actual Temperature(°C)'] / datesArr[index]['Actual Temperature(°C)'].length;
            obj['Forecast Temperature(°C)'] = obj['Forecast Temperature(°C)'] / datesArr[index]['Forecast Temperature(°C)'].length;
            obj['Humidity(%)'] = obj['Humidity(%)'] / datesArr[index]['Humidity(%)'].length;
            return obj;
        });
        return tempArr;
    }
}
