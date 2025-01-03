import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { EventManager } from 'src/utils/EventManager';
import { product_item } from 'src/utils/interfaces';
import { item_fade } from 'src/utils/animations';
import KeyNavigation from 'src/utils/KeyNavigation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [item_fade],
})
export class CartComponent {
  tabindex: number;
  selected_products: product_item[] = [];
  total_price = 0;
  @Output() remove_dessert = new EventEmitter<product_item>();
  @Output() confirm_order = new EventEmitter<void>();

  constructor(private cart_client: CartService) {
    this.cart_client = cart_client;
    this.selected_products = [...this.cart_client.retrieve_desserts()];
    EventManager.on('cart_update', () => this.update_cart());

    const confirm_cb = () => this.confirm_order.emit();
    const cancel_cb = () => {};
    const tabindex = KeyNavigation.add_element(confirm_cb, cancel_cb);
    this.tabindex = tabindex;
  }

  update_cart(): void {
    this.selected_products = [...this.cart_client.retrieve_desserts()];
    this.total_price = 0;
    this.selected_products.forEach((el) => {
      this.total_price += el.price * el.quantity;
    });
  }
}
