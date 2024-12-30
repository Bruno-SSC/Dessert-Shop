import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { product_item } from 'src/utils/interfaces';
import KeyNavigation from 'src/utils/KeyNavigation';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Output() new_order = new EventEmitter<void>();
  checkout_price: number = 0;
  checkout_items: product_item[] = [];
  window_width: number;
  tabindex: number;

  constructor(private cart_client: CartService) {
    this.checkout_items = [...cart_client.retrieve_desserts()];
    this.checkout_price = 0;

    this.window_width = window.innerWidth;

    this.checkout_items.forEach((el) => {
      const amount_price = el.price * el.quantity;
      this.checkout_price += amount_price;
    });

    const confirm_cb = () => this.new_order.emit();
    const cancel_cb = () => {};
    this.tabindex = KeyNavigation.add_element(confirm_cb, cancel_cb);
  }
}
