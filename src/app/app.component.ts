import { Component, OnInit } from '@angular/core';
import { CurrencyInformantService } from './currency-informant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ci: CurrencyInformantService;

  constructor(ci: CurrencyInformantService) {
    this.ci = ci;
    this.ci.updateTimeNow();
  }

  ngOnInit(): void {
    this.ci.getCurrencies();
  }

}
