import { Component } from '@angular/core';
import KeyNavigation from 'src/utils/KeyNavigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product_shop';
  constructor() {
    KeyNavigation.init();
  }
}
