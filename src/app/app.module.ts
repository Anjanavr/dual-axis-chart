import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';


@NgModule({
    declarations: [
        AppComponent,
        ChartComponent
    ],
    imports: [
        BrowserModule,
        ChartsModule
    ],
    exports: [
        ChartComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
