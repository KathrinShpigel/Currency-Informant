import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
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
  currenciesList = [];

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
        fetch(`${this.url}${dayjs().format('YYYY-MM-DD')}&periodicity=0`).then(response => response.json()),
        fetch(`${this.url}${dayjs(this.dateYesterday).format('YYYY-MM-DD')}&periodicity=0`).then(response => response.json()),
      ])
      .then(data => {
        data[0].forEach(el => {
          data[1].forEach((element) => {
            if (el.Cur_ID === element.Cur_ID) {
              const item = {
                Cur_ID: el.Cur_ID,
                Cur_Abbreviation: el.Cur_Abbreviation,
                curName: el.Cur_Name,
                todayCurRate: 0,
                yesterdayCurRate: 0,
                Cur_Scale: el.Cur_Scale,
                change: 0,
              };
              item.todayCurRate = el.Date - element.Date > 0 ? el.Cur_OfficialRate : element.Cur_OfficialRate;
              item.yesterdayCurRate = el.Date - element.Date < 0 ? el.Cur_OfficialRate : element.Cur_OfficialRate;
              item.change = item.todayCurRate - item.yesterdayCurRate;
              this.currenciesList.push(item);
              if (el.Cur_Abbreviation === 'EUR' ||
                el.Cur_Abbreviation === 'USD' ||
                el.Cur_Abbreviation === 'UAH') {
                  this.infoCur.push(item);
                }
            }
          });
        });

      });
}
}
