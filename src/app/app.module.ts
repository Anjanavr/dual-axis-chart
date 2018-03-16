import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { CsvUploadComponent } from './csv-upload/csv-upload.component';

import { FileService } from './shared/util';

@NgModule({
    declarations: [
        AppComponent,
        ChartComponent,
        CsvUploadComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        FileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
