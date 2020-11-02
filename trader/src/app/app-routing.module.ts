import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'watchlist',
    component: WatchlistComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'details/:ticker',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
