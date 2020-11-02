import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/Stock';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  ticker = this.route.snapshot.paramMap.get("ticker")
  stock: Stock;
  detailsUrl:string = `localhost:3000/details/${this.ticker}`
  constructor(private route: ActivatedRoute, private searchService:SearchService) { }

  ngOnInit(): void {
    this.searchService.getStock(this.ticker).subscribe(stock => {
      this.stock = stock;
      console.log(this.stock);
    })
  }

}
