import { 
  Directive, 
  HostListener,
  ElementRef} from '@angular/core';

@Directive({
  selector: '[appBs3DropdownToggle]'
})
export class Bs3DropdownToggleDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') toggle() {
    let bindedEl = (<HTMLElement>this.elementRef.nativeElement);
    if(bindedEl.classList.contains('open')) {
      bindedEl.classList.remove('open');
    } else {
      bindedEl.classList.add('open');
    }
  }

}
