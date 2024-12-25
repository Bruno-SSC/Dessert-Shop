import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { EventManager } from 'src/utils/EventManager';
import { product_item } from 'src/utils/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('fade_in', [
      transition(':enter', [
        style({ opacity: 0 }),
        query(':self', [
          stagger('30ms', [animate('500ms ease', style({ opacity: 1 }))]),
        ]),
      ]),
      transition(':leave', [
        query(':self', [
          stagger('30ms', [animate('200ms ease', style({ opacity: 0 }))]),
        ]),
      ]),
    ]),
  ],
})
export class CartComponent {
  selected_products: product_item[] = [];
  total_price = 0;
  @Output() remove_dessert = new EventEmitter<product_item>();
  @Output() confirm_order = new EventEmitter<void>();

  constructor(private cart_client: CartService) {
    this.cart_client = cart_client;
    this.selected_products = [...this.cart_client.retrieve_desserts()];
    EventManager.on('cart_update', () => this.update_cart());
  }

  update_cart(): void {
    this.selected_products = [...this.cart_client.retrieve_desserts()];
    this.total_price = 0;
    this.selected_products.forEach((el) => {
      this.total_price += el.price * el.quantity;
    });
  }
}
