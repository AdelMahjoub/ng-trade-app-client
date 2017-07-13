import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';

import { GameDetailsComponent } from './game-details/game-details.component';
import { GameItemComponent } from './games-list/game-item/game-item.component';
import { GamesListComponent } from './games-list/games-list.component';


@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
  exports: [
    GameDetailsComponent,
    GameItemComponent,
    GamesListComponent
  ],
  declarations: [
    GamesListComponent, 
    GameItemComponent, 
    GameDetailsComponent
  ]
})
export class GamesModule { }
