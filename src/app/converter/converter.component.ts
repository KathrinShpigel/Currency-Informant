import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';

import { CurrencyInformantService } from '../currency-informant.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  ci: CurrencyInformantService;

  countByn: number;
  countCur: number;
  currencys = [];
  currentCurrency: any;

  constructor(ci: CurrencyInformantService) {
    this.ci = ci;
  }

  ngOnInit(): void {
    this.onCountBynChange();
  }

  changeRatio(event) {
    this.currentCurrency = event.value;
    if (this.countByn) this.onCountBynChange();
    else if(this.countCur) this.onCountCurChange();
  }

  onCountBynChange() {
    if (this.currentCurrency) {
      this.countCur = Math.round(this.countByn * (this.currentCurrency.Cur_Scale/this.currentCurrency.todayCurRate)*10000)/10000;
    }
  }

  onCountCurChange() {
    if (this.currentCurrency) {
      this.countByn = Math.round(this.countCur * (this.currentCurrency.todayCurRate/this.currentCurrency.Cur_Scale)*10000)/10000;
    }
  }

}
