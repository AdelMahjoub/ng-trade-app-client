import { Subscription } from 'rxjs/Subscription';
import { User } from './../../trade/user.model';
import { TradeService } from './../../trade/trade.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeService) { }

  user: User;
  formattedToDisplayUser = [];

  userInfoSubscription: Subscription;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(
      ((params : Params) => {
       if(params['id']) {
         this.userInfoSubscription =  this.tradeService.getUserInfo(params['id'])
          .subscribe(
            (response => {
              if(response['user']) {
                this.user = new User(response['user']);
                this.formatUser();
              }
            })
          );
       }
      })
    );
  }

  ngOnDestroy() {
    if(this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }

  formatUser(): void {
    Object.keys(this.user).forEach(key => {
      this.formattedToDisplayUser.push([key, this.user[key]]);
    });
  }

}
