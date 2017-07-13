import { 
  Component, 
  OnInit, 
  ViewChild,
  ElementRef,
  OnDestroy} from '@angular/core';

import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('collapse') collapse: ElementRef;

  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.onLogin.subscribe(
      () => {
        this.isAuth = true;
      }
    )
    this.authService.onLogout.subscribe(
      () => {
        this.isAuth = false;
      }
    )
    window.addEventListener('click', this.closeDropdown.bind(this), false)
  }

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
  }

  closeDropdown(e: Event) {
    let el = <HTMLElement>e.target;
    let outSide = 
      !el.classList.contains('dropdown-toggle') 
      && !el.classList.contains('dropdown') 
      && !el.classList.contains('fa-user')
      && !el.classList.contains('navbar-toggle')
      && !el.classList.contains('icon-bar')
      && !el.classList.contains('caret');
    let dropdownIsOpen = (<HTMLElement>this.dropdown.nativeElement).classList.contains('open');
    let collapseIsOpen = (<HTMLElement>this.collapse.nativeElement).classList.contains('in');
    if(dropdownIsOpen && outSide) {
      (<HTMLElement>this.dropdown.nativeElement).classList.remove('open');
    }
    if(collapseIsOpen && outSide) {
      (<HTMLElement>this.collapse.nativeElement).classList.remove('in');
    }
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.closeDropdown);
  }

}
