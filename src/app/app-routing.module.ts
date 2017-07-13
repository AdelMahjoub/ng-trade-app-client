import { NgModule } from '@angular/core';

import { 
  Routes, 
  RouterModule, 
  PreloadAllModules} from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './core/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'games', loadChildren: './games/games.module#GamesModule'},
  { path: 'trade', loadChildren: './trade/trade.module#TradeModule'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }