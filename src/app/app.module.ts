import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';
// import { AboutComponent } from './about/about.component';
import { CovidComponent } from './covid/covid.component';
// import { ComparisionComponent } from './comparision/comparision.component';
import { NtmComponent } from './ntm/ntm.component';
// import { TweetsComponent } from './tweets/tweets.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { CommonModule } from '@angular/common';
import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { ChartistModule } from 'ng-chartist';

@NgModule({
  declarations: [
    AppComponent,
    // AboutComponent,
    CovidComponent,
    // ComparisionComponent,
    NtmComponent,
    // TweetsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CommonModule, PlotlyViaWindowModule,
    ChartistModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.plotlyVersion = '1.53.0'; // can be `latest` or any version number (i.e.: '1.40.0')
PlotlyViaCDNModule.plotlyBundle = 'basic'; 
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { DashboardComponent } from './dashboard/dashboard.component';
