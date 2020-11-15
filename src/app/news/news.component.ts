import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  dateNow: Date = new Date();
  now = [
    this.dateNow.getFullYear(),
    this.dateNow.getMonth() + 1,
    this.dateNow.getDate(),
  ];
  news: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http
      .get(`http://newsapi.org/v2/everything?q=bitcoin&from=${this.now[0]}-${this.now[1]}-${this.now[2]}&sortBy=publishedAt&apiKey=1eb3d5e7996b4e47be7d4a1b51c69587`)
      .subscribe(
        (data: any) => this.news = this.getNews(data),
        (error: any) => {
          console.error(error);
        }
      );
  }

  getNews(data: any): [] {
    return data.articles.map((el: any) => {
      return {
        title: `${el.title}: ${el.description}`,
        link: el.url
      };
    });
  }

}
