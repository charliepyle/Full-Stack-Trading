import { Component, OnInit } from '@angular/core';
import { StockWatchItem } from 'src/app/models/StockWatchItem';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  stocks: StockWatchItem[];
  constructor() { }

  ngOnInit(): void {
    this.stocks = new Array();
    for (let i=0; i < localStorage.length; i++) {
      // console.log(localStorage.getItem(localStorage.key(i)));
      let objReturned = JSON.parse(localStorage.getItem(localStorage.key(i)));
      console.log(objReturned);
      if (objReturned.ticker != null && objReturned.quantity != null && objReturned.quantity != 0) {
        this.stocks.push(objReturned);
      }
      


      // $('body').append(localStorage.getItem(localStorage.key(i)));
    }
    console.log(this.stocks);

  }

}
