import { NgModule } from '@angular/core';

import { 
  Routes, 
  RouterModule } from '@angular/router';

import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [
  { path: '',pathMatch: 'full' ,component: GamesListComponent},
  { path: ':id', component: GameDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule { }
