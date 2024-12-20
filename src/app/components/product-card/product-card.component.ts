import { Component, Input } from '@angular/core';
import { product_item } from 'src/utils/interfaces';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('slow_show', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('void => appear', animate('500ms 500ms')),
      transition('appear => void', animate(500)),
    ]),
  ],
})
export class ProductCardComponent {
  selected: boolean = false;
  quantity: number = 0;
  @Input() product: product_item = {} as product_item;

  add_dessert(): void {
    this.selected = true;
    this.quantity = 1;
  }

  decrese_quantity(): void {
    if (this.quantity > 1) this.quantity -= 1;
    else this.selected = false;
  }

  increase_quantity(): void {
    this.quantity += 1;
  }
}
