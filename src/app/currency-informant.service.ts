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
  currenciesListLast2Days = [];
  currencysNamesList = [];
  loading = false;

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
    this.loading = true;
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

              if (dayjs().format('YYYY-MM-DD') === dayjs(`${el.Date.slice(0, 10)}`).format('YYYY-MM-DD')) {
                item.todayCurRate = el.Cur_OfficialRate;
                item.yesterdayCurRate = element.Cur_OfficialRate;
              } else {
                item.todayCurRate = element.Cur_OfficialRate;
                item.yesterdayCurRate = el.Cur_OfficialRate;
              }
              item.change = Math.round(item.todayCurRate*10000 - item.yesterdayCurRate*10000)/10000;

              this.currenciesListLast2Days.push(item);

              if (el.Cur_Abbreviation === 'EUR' ||
                el.Cur_Abbreviation === 'USD' ||
                el.Cur_Abbreviation === 'UAH') {
                  this.infoCur.push(item);
                }
            }
          });
        });
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        console.error(err);
      });
  }

}
