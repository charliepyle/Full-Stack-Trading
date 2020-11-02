import { Component, OnInit, Inject } from '@angular/core';
import { Stock } from 'src/app/models/Stock';
import { DetailsComponent} from '../details/details.component';

@Component({
  selector: 'app-summarytab',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class SummarytabComponent implements OnInit {

  constructor(@Inject(DetailsComponent) private parent: DetailsComponent) { }
  stock: Stock;
  open: Boolean;

  ngOnInit(): void {
    this.stock = this.parent.stock;
    if (this.stock.bidPrice === null) {
      this.open = false;
    }
    else {
      this.open = true;
    }
  }

}
