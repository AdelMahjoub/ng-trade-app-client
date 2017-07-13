import { 
  Directive, 
  HostListener, 
  ElementRef} from '@angular/core';

@Directive({
  selector: '[appBs3NavbarCollapse]'
})
export class Bs3NavbarCollapseDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') collapse() {
    let menu = document.querySelector("div[data='navbar-menu']");
    if(menu.classList.contains('in')) {
      menu.classList.remove('in')
    } else {
      menu.classList.add('in')
    }
  }

}
