import { 
  trigger, 
  animate, 
  transition, 
  style, 
  state} from "@angular/animations";

/**
 * 
 * @param delay animation delay
 */
export function shrinkAnimation(delay) {
  return trigger('shrink', [
    state('*', style({
      opacity: 1,
      fontSize: '12px'
    })),
    state('void', style({
      opacity: 0,
      fontSize: '18px'
    })),
    transition('void => *', animate(delay))
  ]);
}

/**
 * 
 * @param delay animation delay
 */
export function slideUpAnimation(delay, from) {
  return trigger('slideUp', [
    state('*', style({
      opacity: 1,
      transform: 'translateY(0)'
    })),
    state('void', style({
      opacity: 0,
      transform: `translateY(${from})`
    })),
    transition('void => *', animate(delay))
  ]);
}

/**
 * 
 * @param delay animation delay
 */
export function slideInAnimation(delay, from) {
  return trigger('slideIn', [
    state('*', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    state('void', style({
      opacity: 0,
      transform: `translateX(${from})`
    })),
    transition('void => *', animate(delay))
  ]);
}
