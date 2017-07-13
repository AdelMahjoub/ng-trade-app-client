import { Subscription } from 'rxjs/Subscription';
import { TradeService } from './../../trade/trade.service';
import { SearchGameService } from './../../trade/search-game.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit, OnDestroy {

  games = [];       
  pageItems = [];   // Items to show in the current page
  itemsPerPage = 6; // Max items per page
  pages = [];       // Length is the numbers of pages
  index = 0;        // Items cursor
  path: string;     // Current url path

  authUser: any;

  gamesUpdatedSubscription: Subscription;
  userUpdatedSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private gameSearchService: SearchGameService,
    private tradeService: TradeService) { }

  ngOnInit() {
    // Games from search request
    // When the auth user is adding games
    this.gamesUpdatedSubscription = 
    this.gameSearchService.gamesUpdated.subscribe(
      (games => {
        this.games = games || [];
        this.paginate();
      })
    )

    this.handleGamesPerPath();

    this.userUpdatedSubscription =
    this.authService.userUpdated.subscribe(
      (user => {
        this.authUser = user;
        this.handleGamesPerPath();
      })
    )
  }

  ngOnDestroy() {
    if(this.gamesUpdatedSubscription) {
      this.gamesUpdatedSubscription.unsubscribe();
    }
    if(this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
  }

  getAllGames(): void {
    this.tradeService.getAllGames()
      .subscribe(
        (response => {
          this.games = response;
          this.paginate();
        })
      )
  }

  paginate(): void {
    this.pages = [];
    let numberOfPages = Math.ceil(this.games.length / this.itemsPerPage);
    for(let i = 0; i < numberOfPages; i++) {
      this.pages.push(i);
    }
    this.pageItems = this.games.slice(this.index, this.itemsPerPage + this.index);
  }

  nextPage(): void {
    this.index += this.itemsPerPage;
    this.index = Math.max(0, Math.min(this.index, (this.pages.length - 1) * this.itemsPerPage));
    this.paginate();
    window.scrollTo(0, 0);
  }

  previousPage(): void {
    this.index -= this.itemsPerPage;
    this.index = Math.max(0, Math.min(this.index, (this.pages.length - 1) * this.itemsPerPage));
    this.paginate();
    window.scrollTo(0, 0);
  }

  onPageNumberClick(n) {
    this.index = this.itemsPerPage * n;
    this.paginate();
    window.scrollTo(0, 0);
  }

  handleGamesPerPath() {
    this.route.url.subscribe(
      (segments => {

        this.path = segments[0] ? segments[0]['path'] : null;

        this.authUser = this.authService.authUser;

        switch(this.path) {
          case 'my-games':
            if(this.authUser) {
              this.games = this.authUser['myGames'];
              this.paginate();
            }
            break;
          case 'my-requests':
            if(this.authUser) {
              this.games = this.authUser['myRequests'];
              this.paginate();
            }
            break;
          case 'add-games':
            break;
          case 'users-requests':
            if(this.authUser) {
              this.games = this.authUser['myGames'];
              this.paginate();
            }
            break;
          default:
            return this.getAllGames();
        }
       
      })
    )
  }

}
