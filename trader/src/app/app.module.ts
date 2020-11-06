import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { SummarytabComponent } from './components/summarytab/summarytab.component';
import { NewsComponent } from './components/news/news.component';
import { NewscardComponent } from './components/newscard/newscard.component';
import { ChartComponent } from './components/chart/chart.component';
import { StockwatchcardComponent } from './components/stockwatchcard/stockwatchcard.component';
import { PortfoliowatchcardComponent } from './components/portfoliowatchcard/portfoliowatchcard.component';
import { SelfclosingalertComponent } from './components/selfclosingalert/selfclosingalert.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PortfolioComponent,
    WatchlistComponent,
    HomeComponent,
    DetailsComponent,
    SummarytabComponent,
    NewsComponent,
    NewscardComponent,
    ChartComponent,
    StockwatchcardComponent,
    PortfoliowatchcardComponent,
    SelfclosingalertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    HighchartsChartModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
