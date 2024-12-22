import { Component, Input } from '@angular/core';
import { product_item } from 'src/utils/interfaces';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CartService } from 'src/app/services/cart.service';

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
  @Input() product: product_item = {} as product_item;

  constructor(private cart_client: CartService) {}

  add_dessert(): void {
    this.selected = true;
    this.product.quantity = 1;
    this.cart_client.update_dessert(this.product);
  }

  increase_quantity(): void {
    this.product.quantity += 1;
    this.cart_client.update_dessert(this.product);
  }

  decrese_quantity(): void {
    if (this.product.quantity > 1) this.product.quantity -= 1;
    else this.selected = false;
    this.cart_client.remove_dessert(this.product.name);
  }
}
