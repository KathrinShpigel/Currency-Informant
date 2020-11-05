import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): {} {
    this.data = {
      coord: {
        lon: 38.98,
        lat: 45.03
      },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'ясно',
          icon: '01d'
        }
      ],
      base: 'stations',
      main: {
        temp: 15.74,
        feels_like: 11.66,
        temp_min: 15,
        temp_max: 16.67,
        pressure: 1020,
        humidity: 58
      },
      visibility: 10000,
      wind: {
        speed: 5,
        deg: 40
      },
      clouds: {
        all: 0
      },
      dt: 1604573856,
      sys: {
        type: 1,
        id: 8963,
        country: 'RU',
        sunrise: 1604549300,
        sunset: 1604585220
      },
      timezone: 10800,
      id: 542420,
      name: 'Краснодар',
      cod: 200
    };
    return this.weather = {
      temp: `${this.data.main.temp.toFixed(0)}°C`,
      class: `owf-${this.data.weather[0].id}`,
      descr: this.data.weather[0].description,
    };
  }
  // https://api.openweathermap.org/data/2.5/weather?q=${this.city}&lang=ru&appid=8a73b01baf0566caac65bbce78f63431&units=metric
}
