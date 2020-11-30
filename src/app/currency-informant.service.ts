import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CurrencyInformantService {
  dateNow: Date;
  dateNowISO: any;
  dateNowMilliseconds: any;
  dateYesterday: Date = new Date(new Date().setDate(new Date().getDate() - 1));

  url = 'https://www.nbrb.by/api/exrates/rates?ondate=';

  infoCur = [];

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

  getCurrencies(): any {
    return Promise.all([
      fetch(`${this.url}2020-11-22&periodicity=0`).then(response => response.json()),
      fetch(`${this.url}2020-11-23&periodicity=0`).then(response => response.json()),
      ])
      .then(data => {
        const result = [];
        data[0].forEach(el => {
          data[1].forEach(element => {
            if (el.Cur_ID === element.Cur_ID) {
              const item = {
                Cur_ID: el.Cur_ID,
                Cur_Abbreviation: el.Cur_Abbreviation,
                curName: el.Cur_Name,
                todayCurRate: el.Cur_OfficialRate,
                yesterdayCurRate: element.Cur_OfficialRate,
                Cur_Scale: el.Cur_Scale,
              };
              result.push(item);
              if (el.Cur_Abbreviation === 'EUR' ||
                el.Cur_Abbreviation === 'USD' ||
                el.Cur_Abbreviation === 'UAH') {
                  this.infoCur.push(item);
                }
            }
          });
        });

        console.log(data);
      });
}
}
