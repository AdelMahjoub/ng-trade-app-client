import { NgModule } from '@angular/core';
import { 
  Routes, 
  RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { GamesListComponent } from './../games/games-list/games-list.component';
import { AuthGuardService } from './../auth/auth-guard.service';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService], children: [
    { path: 'my-games', component: GamesListComponent },
    { path: 'my-requests', component: GamesListComponent },
    { path: 'users-requests', component: GamesListComponent },
    { path: 'add-games', component: SearchComponent }
  ] },
  { path : '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TradeRoutingModule { }
