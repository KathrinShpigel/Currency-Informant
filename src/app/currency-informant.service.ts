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
    this.dateNow = new Date();
    this.dateNowISO = this.dateNow.toISOString();
    this.dateNowMilliseconds = this.dateNow.getTime();
  }

  updateTimeNow(): any {
    setInterval(() => this.getTimeNow(), 1000);
    this.getTimeNow();
  }
}
