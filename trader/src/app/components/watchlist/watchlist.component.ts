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
      let objReturned = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (objReturned.ticker != null && objReturned.tracking == true) {
        this.stocks.push(objReturned);
      }
    }
    console.log(this.stocks);
  }

  deleteStockItem(stock) {
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].ticker === stock.ticker) {
        this.stocks.splice(i, 1);
        break;
      }
    }
  }

}
