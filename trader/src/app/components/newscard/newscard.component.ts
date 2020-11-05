import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../models/NewsItem';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { fa-twitter } 

@Component({
  selector: 'app-newscard',
  templateUrl: './newscard.component.html',
  styleUrls: ['./newscard.component.css'],
})
export class NewscardComponent implements OnInit {
  @Input() newsItem: NewsItem;
  innerhtml: string;
  tweetString: string;
  formattedDate: string;
  innerDescription: string;
  constructor(private modalService: NgbModal) { }

  modalOpen(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', ariaLabelledBy: 'modal-basic-title'}).result.then(result => {
      console.log(result)
    }).catch(e => console.log(e));
  }

  getTwitterURL() {
    return `https://twitter.com/intent/tweet?text=${this.newsItem.title}&url=${this.newsItem.url}`;
  }

  getFacebookURL() {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.newsItem.url}&amp;src=sdkpreparse`
  }

  ngOnInit(): void {
    library.add(faTwitter);
    if (this.newsItem.source == null) {
      this.innerhtml = this.newsItem.title;
    }
    else {
      this.innerhtml = this.newsItem.source + ": " + this.newsItem.title;
    }
    this.innerDescription = this.newsItem.description;
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date(this.newsItem.publishedAt);
    const month = monthNames[d.getMonth()];

    this.formattedDate = month + " " + d.getDate() + ", " + d.getFullYear();
  }

}
