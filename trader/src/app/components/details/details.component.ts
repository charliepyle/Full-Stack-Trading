import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from "@angular/router";
import { NewsItem } from '../../models/NewsItem';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ticker: String = this.route.snapshot.paramMap.get("ticker")
  stock: Stock;
  stockSaved:Boolean
  notStockSaved:Boolean
  open: Boolean;
  closed: Boolean;
  news: NewsItem[]
  detailsUrl:string = `localhost:3000/details/${this.ticker}`
  constructor(private route: ActivatedRoute, private searchService:SearchService) { }

  ngOnInit(): void {
    this.searchService.getStock(this.ticker).subscribe(stock => {
      this.stock = stock;

      if (localStorage.getItem(this.stock.ticker) == null) {
        this.stockSaved = false; // change later to check if it's in local storage
        this.notStockSaved = true;
      }
      else {
        this.stockSaved = true; // change later to check if it's in local storage
        this.notStockSaved = false;
      }
     

      this.news = stock.news;
      if (this.stock.bidPrice === null) {
        this.open = false;
        this.closed = true;
      }
      else {
        this.open = true;
        this.closed = false;
      }
    })
  }

  stockSave() {
    this.stockSaved = true;
    this.notStockSaved = false;
    let priceToSend;
    if (this.open) {
      priceToSend = this.stock.lastPrice;
    }
    else {
      priceToSend = this.stock.closePrice;
    }
    const objectToStore = {
      ticker: this.stock.ticker,
      lastPrice: priceToSend,
      change: this.stock.change,
      changePercent: this.stock.changePercent,
      companyName: this.stock.companyName,
    }
    localStorage.setItem(this.stock.ticker, JSON.stringify(objectToStore));
    console.log(localStorage.getItem(this.stock.ticker));
    // add to local storage eventually
  }
  stockUnsave() {
    this.stockSaved = false;
    this.notStockSaved = true
    localStorage.removeItem(this.stock.ticker)
  }

}
