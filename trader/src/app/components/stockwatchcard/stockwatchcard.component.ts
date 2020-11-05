import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/Stock';
import { StockWatchItem } from 'src/app/models/StockWatchItem';

@Component({
  selector: 'app-stockwatchcard',
  templateUrl: './stockwatchcard.component.html',
  styleUrls: ['./stockwatchcard.component.css']
})
export class StockwatchcardComponent implements OnInit {
  @Input() stockItem: StockWatchItem;
  @Output() deleteStockItem: EventEmitter<StockWatchItem> = new EventEmitter();
  positiveChange: boolean;
  negativeChange: boolean;
  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['/details/' + this.stockItem.ticker ]);
  }

  onExitClick() {
    this.stockItem.tracking = false;
    let storedStock = JSON.parse(localStorage.getItem(this.stockItem.ticker));
    storedStock.tracking = false;
    localStorage.setItem(storedStock.ticker, JSON.stringify(storedStock));
    this.deleteStockItem.emit(this.stockItem);
  }

  ngOnInit(): void {
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
