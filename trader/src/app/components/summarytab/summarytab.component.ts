import { Component, OnInit, Inject, Input } from '@angular/core';
import { Stock } from 'src/app/models/Stock';
import { DetailsComponent} from '../details/details.component';

@Component({
  selector: 'app-summarytab',
  templateUrl: './summarytab.component.html',
  styleUrls: ['./summarytab.component.css']
})
export class SummarytabComponent implements OnInit {
  @Input() stock: Stock;
  constructor(@Inject(DetailsComponent) private parent: DetailsComponent) { }
  // stock: Stock;
  open: Boolean;

  ngOnInit(): void {
    // this.stock = this.parent.stock;
    console.log(this.stock);
    if (this.stock.stockOpen === false) {
      this.open = false;
    }
    else {
      this.open = true;
    }
  }

}
