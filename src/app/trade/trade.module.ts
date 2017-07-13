import { ReactiveFormsModule } from '@angular/forms';
import { GamesModule } from './../games/games.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    TradeRoutingModule,
    GamesModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    SearchComponent
  ],
  providers: []
})
export class TradeModule { }
