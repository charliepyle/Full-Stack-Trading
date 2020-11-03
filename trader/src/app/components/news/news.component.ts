import { Component, OnInit, Inject } from '@angular/core';
import { NewsItem } from 'src/app/models/NewsItem';
import { DetailsComponent } from '../details/details.component';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: NewsItem[];
  constructor(@Inject(DetailsComponent) private parent: DetailsComponent) { }

  ngOnInit(): void {
    this.news = this.parent.news;
  }

  private inBounds(news: NewsItem[], i: number) {
    return (2*i + 1) < news.length;
  }

}
