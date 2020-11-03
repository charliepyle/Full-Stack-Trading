import { Component, OnInit } from '@angular/core';
import { StockWatchItem } from 'src/app/models/StockWatchItem';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  stocks: StockWatchItem[];
  constructor() { }

  ngOnInit(): void {
    this.stocks = new Array();
    for (let i=0; i < localStorage.length; i++) {
      // console.log(localStorage.getItem(localStorage.key(i)));
      let objReturned = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (objReturned.ticker != null) {
        this.stocks.push(objReturned);
      }
      


      // $('body').append(localStorage.getItem(localStorage.key(i)));
    }
    console.log(this.stocks);
  }

}
