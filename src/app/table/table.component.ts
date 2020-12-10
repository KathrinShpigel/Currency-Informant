import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CurrencyInformantService } from '../currency-informant.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(ci: CurrencyInformantService) {
    this.ci = ci;
  }

  ngOnInit(): void {
    console.log(this.ci.currenciesList);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
