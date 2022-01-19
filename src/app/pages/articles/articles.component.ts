import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInfosMedium()
  }

  articles: any

  getInfosMedium() {
    this.http.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rafael-hs")
      .subscribe(data => {
        let values = Object.values(data)
        this.articles = values[2]
      })
  }

  format_date(date: string) {
    let date_att = new Date(date)
    return date_att.toUTCString()
  }

}
