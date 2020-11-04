import { Component, OnInit, Input } from '@angular/core';
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
  tempTotalPrice: number;
  tempQuantity: number;
  marketValue: number;
  costPerShare: number;
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
    let priceToAdd = this.stockItem.lastPrice * this.tempQuantity;
    this.stockItem.quantity += this.tempQuantity;
    this.stockItem.totalCost += priceToAdd;
    this.costPerShare = this.stockItem.totalCost/this.stockItem.quantity;
    this.marketValue = this.stockItem.quantity * this.stockItem.lastPrice;
  }

  sellModalClose() {
    let priceToRemove = this.costPerShare * this.tempQuantity;
    this.stockItem.quantity -= this.tempQuantity;
    this.stockItem.totalCost -= priceToRemove;
    this.costPerShare = this.stockItem.totalCost/this.stockItem.quantity;
    this.marketValue = this.stockItem.quantity * this.stockItem.lastPrice;
  }

  

  updateTotalPrice(quantity) {
    // console.log(this.mostRecentPrice);
    // console.log(quantity);

    this.tempTotalPrice= this.stockItem.lastPrice * Number(quantity);
    this.tempQuantity = Number(quantity);
  }

  ngOnInit(): void {
    this.marketValue = this.stockItem.quantity * this.stockItem.lastPrice;
    this.costPerShare = this.stockItem.totalCost/this.stockItem.quantity;
  }

}
