import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from "@angular/router";
import { NewsItem } from '../../models/NewsItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ticker: String = this.route.snapshot.paramMap.get("ticker")
  refreshSubscription: Subscription
  stock: Stock;
  stockSaved:Boolean
  notStockSaved:Boolean
  open: Boolean;
  closed: Boolean;
  news: NewsItem[];
  quantity: number;
  totalPrice: number;
  mostRecentPrice: number;
  detailsUrl:string = `localhost:3000/details/${this.ticker}`
  constructor(private route: ActivatedRoute, private searchService:SearchService, private modalService: NgbModal) { 
    const intervalDuration = 15000;
    this.refreshSubscription = interval(intervalDuration).subscribe(result => {
      this.refreshMarket();
    })
  }

  ngOnInit(): void {
    this.refreshMarket()
  }

  refreshMarket() {
    this.searchService.getStock(this.ticker).subscribe(stock => {
      this.stock = stock;
      const storedStock = JSON.parse(localStorage.getItem(this.stock.ticker));
      console.log(this.stock);
      if (storedStock != null && storedStock.tracking == true) {
        this.stockSaved = true; 
        this.notStockSaved = false;

        
      }
      else {
        this.stockSaved = false;
        this.notStockSaved = true;
      }
     

      this.news = stock.news;

      if (this.stock.stockOpen == false) {
        this.open = false;
        this.closed = true;
        this.mostRecentPrice = Number(this.stock.closePrice);

      }
      else {
        this.open = true;
        this.closed = false;
        this.mostRecentPrice = Number(this.stock.lastPrice);
      }
    })
  }

  modalOpen(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(result => {
      console.log(this.totalPrice)
    }).catch(e => console.log(e));
  }

  modalClose() {
    const stockStored = JSON.parse(localStorage.getItem(this.stock.ticker));
    if (stockStored == null) {
      const objectToStore = {
        ticker: this.stock.ticker,
        lastPrice: this.mostRecentPrice,
        change: this.stock.change,
        changePercent: this.stock.changePercent,
        companyName: this.stock.companyName,
        totalCost: this.totalPrice,
        quantity: this.quantity,
        tracking: this.stockSaved,
      };

      localStorage.setItem(this.stock.ticker, JSON.stringify(objectToStore));

    }
    else {
      stockStored.totalCost += this.totalPrice;
      stockStored.quantity += this.quantity;
      localStorage.setItem(this.stock.ticker, JSON.stringify(stockStored))
    }
  }

  updateTotalPrice(quantity) {
    this.totalPrice = Number((this.mostRecentPrice * Number(quantity)).toFixed(2));
    this.quantity = Number(quantity);
  }

  stockSave() {
    this.stockSaved = true;
    this.notStockSaved = false;
    
    let currentlyStored = JSON.parse(localStorage.getItem(this.stock.ticker));

    if (currentlyStored == null) {
      const objectToStore = {
        ticker: this.stock.ticker,
        lastPrice: this.mostRecentPrice,
        change: this.stock.change,
        changePercent: this.stock.changePercent,
        companyName: this.stock.companyName,
        tracking: true,
      }
      localStorage.setItem(this.stock.ticker, JSON.stringify(objectToStore));
    }
    else {
      currentlyStored.tracking = true;
      localStorage.setItem(this.stock.ticker, JSON.stringify(currentlyStored));
    }


  }
  stockUnsave() {
    this.stockSaved = false;
    this.notStockSaved = true;
    let currentlyStored = JSON.parse(localStorage.getItem(this.stock.ticker));
    currentlyStored.tracking = false;
    localStorage.setItem(this.stock.ticker, JSON.stringify(currentlyStored));
  }

  ngOnDestroy() {
    this.refreshSubscription.unsubscribe();
  }

}
