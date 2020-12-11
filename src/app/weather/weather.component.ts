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

  city = localStorage.getItem('city2$') || 'Краснодар';
  data: any;
  weather: any;
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData();
  }

  getWeather(data: any): void {
    this.weather = {
      temp: `${data.main.temp.toFixed(0)}°C`,
      class: `owf-${data.weather[0].id}`,
      descr: data.weather[0].description,
    };
    this.loading = false;
  }

  getData(e?): void {
    this.loading = true;
    this.http
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=ru&appid=8a73b01baf0566caac65bbce78f63431&units=metric`)
      .subscribe(
        (data: any) => this.getWeather(data),
        (error: any) => {
          e.target.textContent = this.city = 'Краснодар';
          localStorage.removeItem('city2$');
          this.setCity('err');
        }
      );
  }

  setCity(e?): void {
    this.loading = true;
    if (e.type === 'keypress') {
      if (e.which === 13 || e.keyCode === 13) {
        if (e.target.textContent === '') {
          e.target.textContent = this.city = localStorage.getItem('city2$') || 'Краснодар';
          return;
        }
        localStorage.setItem('city2$', e.target.textContent);
        this.city = e.target.textContent;
      }
    } else if (e === 'err') {
      this.getData();
    } else {
      if (e.target.textContent === '') {
        e.target.textContent = this.city = localStorage.getItem('city2$') || 'Краснодар';
        return;
      }
      localStorage.setItem('city2$', e.target.textContent);
      this.city = e.target.textContent;
      this.getData(e);
    }
  }

  clearCity(e): void {
    e.target.textContent = '';
  }

}
