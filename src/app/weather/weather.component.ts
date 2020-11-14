import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: [
    './owfont-regular.css',
    './weather.component.scss',
    ]
})
export class WeatherComponent implements OnInit {

  city = 'Краснодар';
  data: any;
  weather: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=ru&appid=8a73b01baf0566caac65bbce78f63431&units=metric`)
      .subscribe((data: any) => this.getWeather(data));
  }

  getWeather(data: any): {} {
    return this.weather = {
      temp: `${data.main.temp.toFixed(0)}°C`,
      class: `owf-${data.weather[0].id}`,
      descr: data.weather[0].description,
    };
  }

}
