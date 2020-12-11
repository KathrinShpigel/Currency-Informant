import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ChartComponent } from './chart/chart.component';
import { ConverterComponent } from './converter/converter.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'chart', component: ChartComponent},
  {path: 'converter', component: ConverterComponent},
  {path: 'table', component: TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
