import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyInformantService {
  dateNow: Date;
  dateNowISO: any;
  dateNowMilliseconds: any;

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
