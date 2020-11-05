import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StockWatchItem } from 'src/app/models/StockWatchItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-portfoliowatchcard',
  templateUrl: './portfoliowatchcard.component.html',
  styleUrls: ['./portfoliowatchcard.component.css'],
})
export class PortfoliowatchcardComponent implements OnInit {
  @Input() stockItem: StockWatchItem;
  @Output() deleteStockItem: EventEmitter<StockWatchItem> = new EventEmitter();
  tempTotalPrice: number;
  tempQuantity: number;
  marketValue: number;
  costPerShare: number;
  change: number;
  positiveChange: boolean;
  negativeChange: boolean;
  constructor(private router: Router, private modalService: NgbModal) { }

  redirect() {
    this.router.navigate(['/details/' + this.stockItem.ticker ]);
  }

  modalOpen(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', ariaLabelledBy: 'modal-basic-title'}).result.then(result => {
      console.log(result)
    }).catch(e => console.log(e));
  }

  buyModalClose() {
    let priceToAdd = Number((this.stockItem.lastPrice * this.tempQuantity).toFixed(2));
    this.stockItem.quantity += this.tempQuantity;
    this.stockItem.totalCost = Number(this.stockItem.totalCost.toFixed(2))
    this.stockItem.totalCost += priceToAdd;
    this.costPerShare =  Number((this.stockItem.totalCost/this.stockItem.quantity).toFixed(2));
    this.marketValue =  Number((this.stockItem.quantity * this.stockItem.lastPrice).toFixed(2));
    this.change = Number((this.costPerShare - this.stockItem.lastPrice).toFixed(2));

    let storedStock = JSON.parse(localStorage.getItem(this.stockItem.ticker));
    storedStock.quantity = this.stockItem.quantity;
    storedStock.totalCost = this.stockItem.totalCost;
    localStorage.setItem(storedStock.ticker, JSON.stringify(storedStock));

  }

  sellModalClose() {
    let priceToRemove = Number((this.costPerShare * this.tempQuantity).toFixed(2));
    this.stockItem.quantity -= this.tempQuantity;
    this.stockItem.totalCost = Number(this.stockItem.totalCost.toFixed(2))
    this.stockItem.totalCost -= priceToRemove;
    this.costPerShare = Number((this.stockItem.totalCost/this.stockItem.quantity).toFixed(2));
    this.marketValue = Number((this.stockItem.quantity * this.stockItem.lastPrice).toFixed(2));
    this.change = Number((this.costPerShare - this.stockItem.lastPrice).toFixed(2));


    let storedStock = JSON.parse(localStorage.getItem(this.stockItem.ticker));
    storedStock.quantity = this.stockItem.quantity;
    storedStock.totalCost = this.stockItem.totalCost;
    localStorage.setItem(storedStock.ticker, JSON.stringify(storedStock));
    // if quantity == 0
    if (this.stockItem.quantity == 0) {
      this.deleteStockItem.emit(this.stockItem);
    }
    
  }

  

  updateTotalPrice(quantity) {

    this.tempTotalPrice= Number((this.stockItem.lastPrice * Number(quantity)).toFixed(2));
    this.tempQuantity = Number(quantity);
  }

  ngOnInit(): void {
    this.stockItem.totalCost = Number(this.stockItem.totalCost.toFixed(2))
    this.marketValue = Number((this.stockItem.quantity * this.stockItem.lastPrice).toFixed(2));
    this.costPerShare = Number((this.stockItem.totalCost/this.stockItem.quantity).toFixed(2));
    this.change = Number((this.costPerShare - this.stockItem.lastPrice).toFixed(2));

  }

  applyStyles() {
    let color;
    if (this.stockItem.change > 0) {
      color = 'green';
      this.positiveChange = true;
      this.negativeChange = false;
    }
    else if (this.stockItem.change == 0) {
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
