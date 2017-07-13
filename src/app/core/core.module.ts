// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Directives
import { Bs3NavbarCollapseDirective } from '../shared/bs3-navbar-collapse.directive';
import { Bs3DropdownToggleDirective } from '../shared/bs3-dropdown-toggle.directive';

// Services
import { AuthService } from '../auth/auth.service';
import { BaseApiUrlService } from '../shared/base-api-url.service';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TradeService } from './../trade/trade.service';
import { SearchGameService } from './../trade/search-game.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ],
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    PageNotFoundComponent,
    Bs3DropdownToggleDirective,
    Bs3NavbarCollapseDirective
  ],
  providers: [
    BaseApiUrlService,
    AuthService,
    AuthGuardService,
    SearchGameService,
    TradeService
  ]
})
export class CoreModule { }
