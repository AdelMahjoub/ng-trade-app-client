import { 
  Component, 
  OnInit } from '@angular/core';

import { 
  slideInAnimation, 
  slideUpAnimation } from '../../shared/utils/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    slideInAnimation(500, '-500px'),
    slideUpAnimation(400, '300px')
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
