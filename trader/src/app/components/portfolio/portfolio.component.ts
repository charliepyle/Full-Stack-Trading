import { Component, OnInit } from '@angular/core';
import { StockWatchItem } from 'src/app/models/StockWatchItem';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stocks: StockWatchItem[];
  noStocks: boolean;
  constructor(private searchService:SearchService) { }

  ngOnInit(): void {
    
    let stockTickers = new Array();
    
    for (let i=0; i < localStorage.length; i++) {
      // console.log(localStorage.getItem(localStorage.key(i)));
      let objReturned = JSON.parse(localStorage.getItem(localStorage.key(i)));
      console.log(objReturned);
      if (objReturned.ticker != null && objReturned.quantity != null && objReturned.quantity != 0) {
        stockTickers.push(objReturned);
      }
    }

    if (stockTickers === undefined || stockTickers.length == 0) {
      this.noStocks = true;
    }
    else {
      this.noStocks = false;
    }

    let stockString = "";
    for (const stock of stockTickers) {
      stockString += stock.ticker + ","
    }

    this.stocks = new Array();
    this.searchService.getLatestPrices(stockString).subscribe(stocksReturned => {
      for (const stock of stocksReturned) {
        const storedStock = JSON.parse(localStorage.getItem(stock.ticker));
        storedStock.lastPrice = stock.lastPrice;
        localStorage.setItem(stock.ticker, JSON.stringify(storedStock));
        this.stocks.push(storedStock);
      }
      

      console.log(this.stocks);
    }) 

  }

  deleteStockItem(stock) {
    for (let i = 0; i < this.stocks.length; i++) {
      if (this.stocks[i].ticker === stock.ticker) {
        this.stocks.splice(i, 1);
        if (this.stocks === undefined || this.stocks.length == 0) {
          this.noStocks = true;
        }
        else {
          this.noStocks = false;
        }
        break;
      }
    }
  }

}
