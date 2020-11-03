import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StockWatchItem } from 'src/app/models/StockWatchItem';

@Component({
  selector: 'app-stockwatchcard',
  templateUrl: './stockwatchcard.component.html',
  styleUrls: ['./stockwatchcard.component.css']
})
export class StockwatchcardComponent implements OnInit {
  @Input() stockItem: StockWatchItem;
  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['/details/' + this.stockItem.ticker ]);
  }

  ngOnInit(): void {
  }

}
