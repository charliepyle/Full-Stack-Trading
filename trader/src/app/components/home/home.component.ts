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
  tempSearch: string = 'Enter stock name';
  loading:boolean = false;
  constructor(private router: Router, private searchService:SearchService) { }

  onSubmit(stock) {
    this.tempSearch = stock.ticker
  }

  onReroute() {
    this.router.navigate(['/details/' + this.tempSearch]);
  }



  // ngOnChanges(changes: SimpleChanges) {
  //   for (const propName in changes) {
  //     console.log(changes[propName]);
  //   }
  // }

  textChanged() {
    // this.stocks = []
    this.loading=true;
    this.searchService.getAutocomplete(this.tempSearch).subscribe(stocksReturned => {
      console.log(stocksReturned);
      if (stocksReturned == null) {
        this.stocks = []
        this.loading=false;
      }
      else {
        this.stocks = Array.from(stocksReturned);
        console.log(this.stocks);
        this.loading=false;
      }
    })
    
  }

  ngOnInit(): void {
  }

}
