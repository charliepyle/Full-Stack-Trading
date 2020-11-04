import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from "@angular/router";
import { NewsItem } from '../../models/NewsItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  news: NewsItem[];
  quantity: number;
  totalPrice: number;
  mostRecentPrice: number;
  detailsUrl:string = `localhost:3000/details/${this.ticker}`
  constructor(private route: ActivatedRoute, private searchService:SearchService, private modalService: NgbModal) { }

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
    console.log('alksdfkldsjflsd')
    console.log(this.quantity);
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
    this.totalPrice = this.mostRecentPrice * Number(quantity);
    this.quantity = Number(quantity);
  }

  stockSave() {
    this.stockSaved = true;
    this.notStockSaved = false;

    const objectToStore = {
      ticker: this.stock.ticker,
      lastPrice: this.mostRecentPrice,
      change: this.stock.change,
      changePercent: this.stock.changePercent,
      companyName: this.stock.companyName,
      tracking: true,
    }
    localStorage.setItem(this.stock.ticker, JSON.stringify(objectToStore));
    // add to local storage eventually
  }
  stockUnsave() {
    this.stockSaved = false;
    this.notStockSaved = true;
    let currentlyStored = JSON.parse(localStorage.getItem(this.stock.ticker));
    currentlyStored.tracking = false;
    localStorage.setItem(this.stock.ticker, JSON.stringify(currentlyStored));
  }

}
