import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../models/NewsItem';

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.css'],
})
export class NewscardComponent implements OnInit {
  @Input() newsItem: NewsItem;
  innerhtml: string;
  constructor() { }

  ngOnInit(): void {
    if (this.newsItem.source == null) {
      this.innerhtml = this.newsItem.description;
    }
    else {
      this.innerhtml = this.newsItem.source + ": " + this.newsItem.description;
    }
  }

}
