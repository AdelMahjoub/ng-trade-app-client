import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from './../../../trade/trade.service';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Game } from '../../game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit, OnDestroy {

  @Input('game') game: any;
  
  authUser: any;

  authIsOwner = false;

  gameIsRequested = false;

  userGame: Game;
  
  notification: string;

  path: string;

  userUpdatedSubscription: Subscription;
  addToCollectionSubscription: Subscription;
  getAuthUserSubscription: Subscription;
  requestGameSubscription: Subscription;
  discardGameSubscription: Subscription;
  restractGameSubscription: Subscription;

  constructor(
    private tradeService: TradeService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userGame = new Game(this.game);
    this.authUser = this.authService.authUser;

    this.route.url.subscribe(
      (segments => {
        if(segments[0]) {
          this.path = segments[0]['path'];
        }
      })
    )

    this.userUpdatedSubscription = 
    this.authService.userUpdated.subscribe(
      (user => {
        this.authUser = user;
        this.gameIsRequested = this.isRequested();
      })
    )
    if(this.authUser && this.userGame['owner']) {
      this.authIsOwner = (this.userGame['owner']['_id'] === this.authUser['_id']);
      this.gameIsRequested = this.isRequested();
    }
  }

  ngOnDestroy() {
    if(this.userUpdatedSubscription) {
      this.userUpdatedSubscription.unsubscribe();
    }
    if(this.addToCollectionSubscription){
      this.addToCollectionSubscription.unsubscribe();
    }
    if(this.getAuthUserSubscription) {
      this.getAuthUserSubscription.unsubscribe();
    }
    if(this.requestGameSubscription) {
      this.requestGameSubscription.unsubscribe();
    }
    if(this.discardGameSubscription) {
      this.discardGameSubscription.unsubscribe();
    }
    if(this.restractGameSubscription) {
      this.restractGameSubscription.unsubscribe();
    }
  }

  addGame(): void {
    if(!this.userGame) {
      return;
    }
    this.addToCollectionSubscription =
    this.tradeService.addToCollection(this.userGame)
      .subscribe(
        (response => {
          let errors = <Array<any>>response['errors'];
          if(errors.length === 0) {
            this.notification = 'Game added !';
            this.getAuthUserSubscription =
            this.authService.getAuthenticatedUser()
              .subscribe();
            setTimeout(() => {
              this.notification = null;
            }, 1000);
          }
        })
      )
  }

  requestGame(): void {
    this.requestGameSubscription = 
    this.tradeService.requestGame(this.userGame['_id'])
      .subscribe(
        (response => {
          if(response['errors'].length === 0) {
            this.authUser = this.authService.authUser;
          } else {
            this.notification = response['errors'][0];
          }
        })
      )
  }

  retract(): void {
    this.restractGameSubscription =
    this.tradeService.retract(this.userGame['_id'])
      .subscribe(
        (response => {
          if(response['errors'].length === 0) {
            this.authUser = this.authService.authUser;
          } else {
            this.notification = response['errors'][0];
          }
        })
      )
  }

  discard(): void {
    this.discardGameSubscription =
    this.tradeService.discard(this.userGame['_id'])
      .subscribe(
        (response => {
          if(response['errors'].length === 0) {
            this.authUser = this.authService.authUser;
          } else {
            this.notification = response['errors'][0];
          }
        })
      )
  }

  isRequested(): boolean {
    let match = 0;
    (<Array<any>>this.authUser['myRequests']).forEach(game => {
      if(game['_id'] === this.userGame['_id']) {
        match++;
      }
    });
    if(match > 0) {
     return true;
    }
    return false;
  }


}
