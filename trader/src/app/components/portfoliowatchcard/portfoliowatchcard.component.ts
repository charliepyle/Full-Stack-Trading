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
  constructor(private router: Router, private modalService: NgbModal) { }

  redirect() {
    this.router.navigate(['/details/' + this.stockItem.ticker ]);
  }

  modalOpen(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', ariaLabelledBy: 'modal-basic-title'}).result.then(result => {
      console.log(result)
    }).catch(e => console.log(e));
  }

  updateTotalPrice(quantity) {
    // console.log(this.mostRecentPrice);
    // console.log(quantity);

    this.tempTotalPrice= this.stockItem.lastPrice * Number(quantity);
    this.tempQuantity = Number(quantity);
  }

  ngOnInit(): void {
  }

}
