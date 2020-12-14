import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CurrencyInformantService } from '../currency-informant.service';

export interface PeriodicElement {
  Cur_Abbreviation: string;
  Cur_Scale: number;
  curName: number;
  todayCurRate: number;
  yesterdayCurRate: number;
  change: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  ci: CurrencyInformantService;

  displayedColumns: string[] = [
    'Cur_Abbreviation', 'Cur_Scale', 'curName', 'todayCurRate', 'yesterdayCurRate', 'change'
  ];

  dataSource;

  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(ci: CurrencyInformantService) {
    this.ci = ci;
  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    if (!this.ci.loading) {
      this.ci.currenciesListLast2Days.forEach(el => {
        ELEMENT_DATA.push(el)
      });
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      const sortState: Sort = {active: 'name', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      console.log(this.sort);
    }
  }

}
