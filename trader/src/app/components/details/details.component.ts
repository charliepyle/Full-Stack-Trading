import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from "@angular/router";
import { NewsItem } from '../../models/NewsItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval, Subscription } from 'rxjs'
import { utf8Encode } from '@angular/compiler/src/util';

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
  positiveChange: boolean;
  negativeChange: boolean;
  currentDateTime: string;
  formattedStockDate: string;

  detailsUrl:string = `localhost:3000/details/${this.ticker}`
  constructor(private route: ActivatedRoute, private searchService:SearchService, private modalService: NgbModal) { 
    const intervalDuration = 15000;
    this.refreshSubscription = interval(intervalDuration).subscribe(result => {
      this.refreshMarket();
      this.applyStyles();
    })
  }

  ngOnInit(): void {
    this.refreshMarket();
    this.applyStyles();
  }

  setDates() {
    let currentDate = new Date();
    let currentUTCDate = new Date(currentDate.toUTCString());

    let month = String(currentUTCDate.getMonth()+1)
    let date = String(currentUTCDate.getDate());
    let hours = String(currentUTCDate.getHours());
    let minutes = String(currentUTCDate.getMinutes());
    let seconds = String(currentUTCDate.getSeconds());

    if (Number(month) <= 9) {
      month = String("0" + month)
    }

    if (Number(date) <= 9) {
      date = String("0" + date)
    }
    if (Number(hours) <= 9) {
      hours = String("0" + hours)
    }
    if (Number(minutes) <= 9) {
      minutes = String("0" + minutes)
    }
    if (Number(seconds) <= 9) {
      seconds = String("0" + seconds)
    }

    this.currentDateTime = currentUTCDate.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    
    let stockDate = new Date(this.stock.date);
    console.log(this.stock.date);
    console.log(stockDate)
    let currentStockUTCDate = new Date(stockDate.toUTCString());

    month = String(currentStockUTCDate.getMonth()+1)
    date = String(currentStockUTCDate.getDate());
    hours = String(currentStockUTCDate.getHours());
    minutes = String(currentStockUTCDate.getMinutes());
    seconds = String(currentStockUTCDate.getSeconds());

    if (Number(month) <= 9) {
      month = String("0" + month)
    }

    if (Number(date) <= 9) {
      date = String("0" + date)
    }

    if (Number(hours) <= 9) {
      hours = String("0" + hours)
    }
    if (Number(minutes) <= 9) {
      minutes = String("0" + minutes)
    }
    if (Number(seconds) <= 9) {
      seconds = String("0" + seconds)
    }


    this.formattedStockDate = currentStockUTCDate.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    
  }

  refreshMarket() {
    this.searchService.getStock(this.ticker).subscribe(stock => {
      this.stock = stock;
      this.setDates()
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

  applyStyles() {
    let color;
    if (this.stock.change > 0) {
      color = 'green';
      this.positiveChange = true;
      this.negativeChange = false;
    }
    else if (this.stock.change == 0) {
      color = 'black';
      this.positiveChange = false;
      this.negativeChange = false;
    }
    else {
      color = 'red';
      this.positiveChange = false;
      this.negativeChange = true;
    }



    const styles = {'color': color};
    return styles;
  }

}
