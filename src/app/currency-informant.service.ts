import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyInformantService {
  dateNow: Date;
  dateNowISO: any;
  dateNowMilliseconds: any;
  dateYesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));

  currencies = [
    {
      curName: 'EUR',
      curID: 170,
      today: 1.55,
      yesterday: 1.45,
    },
    {
      curName: 'USD',
      curID: 190,
      today: 1.05,
      yesterday: 1.10,
    },
    {
      curName: 'UAH',
      curID: 180,
      today: 0.35,
      yesterday: 0.35,
    },
  ];

  constructor() { }

  getTimeNow(): void {
    const options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };

    this.dateNow = new Date();
    this.dateNowISO = this.dateNow.toLocaleDateString('ru-RU', options);
    this.dateNowMilliseconds = this.dateNow.getTime();
  }

  updateTimeNow(): any {
    setInterval(() => this.getTimeNow(), 1000);
    this.getTimeNow();
  }
}
