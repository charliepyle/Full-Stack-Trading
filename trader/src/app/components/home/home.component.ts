import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StockPreview} from '../../models/StockPreview';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = new FormControl('');
  stocks = [];
  constructor(private router: Router, private searchService:SearchService) { }

  onSubmit(stock) {
    this.router.navigate(['/details/' + stock.ticker]);
  }



  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName in changes) {
  //     console.log(changes[propName]);
  //   }
  // }

  textChanged() {
    // this.stocks = []
    this.searchService.getAutocomplete(this.search.value).subscribe(stocksReturned => {
      console.log(stocksReturned);
      if (stocksReturned == null) {
        this.stocks = []
      }
      else {
        this.stocks = Array.from(stocksReturned);
        console.log(this.stocks);
      }
    })
  }

  ngOnInit(): void {
  }

}
