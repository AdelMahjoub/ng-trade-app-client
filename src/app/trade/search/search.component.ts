import { Subscription } from 'rxjs/Subscription';
import { SearchGameService } from './../search-game.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchForm: FormGroup;
  previousSearchTerm: string;
  games = [];

  findGameSubscription: Subscription;

  constructor(private findGameService: SearchGameService) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if(this.findGameSubscription) {
      this.findGameSubscription.unsubscribe();
    }
  }

  initForm(): void {
    this.searchForm = new FormGroup({
      'search': new FormControl('', Validators.required)
    });
  }

  get searchTerm(): AbstractControl {
    return this.searchForm.get('search');
  }

  submit(): void {
    if(this.searchForm.invalid || this.searchTerm.value === this.previousSearchTerm) {
      return;
    }
    this.previousSearchTerm = this.searchTerm.value;
    this.findGameSubscription =
    this.findGameService.findGames(this.searchTerm.value)
      .subscribe(
        (response => {
          this.games = response;
          this.findGameService.gamesUpdated.next(this.games);
        })
      )
  }

}
