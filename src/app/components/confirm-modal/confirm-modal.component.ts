import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { product_item } from 'src/utils/interfaces';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  animations: [
    trigger('slide_in', [
      state('hidden', style({ opacity: 0, transform: 'translateY(100%)' })),
      transition('void => show_mob', [
        style({ transform: 'translateY(100%)' }),
        animate('500ms ease-in'),
        style({ transform: 'translateY(-100%)' }),
      ]),
      transition('show_mob => hidden', animate('500ms ease-in')),
      transition('void => show_desk', [
        style({ opacity: 0 }),
        animate('500ms ease-in'),
        style({ opacity: 1 }),
      ]),
      transition('show_desk => hidden_desk', [
        style({ opacity: 1 }),
        animate('500ms ease-in'),
        style({ opacity: 0 }),
      ]),
    ]),
  ],
})
export class ConfirmModalComponent {
  @Input() confirmed_order: boolean = false;
  @Output() new_order = new EventEmitter<void>();
  checkout_price: number = 0;
  checkout_items: product_item[] = [];
  window_width: number;

  constructor(private cart_client: CartService) {
    this.checkout_items = [...cart_client.retrieve_desserts()];
    this.checkout_price = 0;

    this.window_width = window.innerWidth;

    this.checkout_items.forEach((el) => {
      const amount_price = el.price * el.quantity;
      this.checkout_price += amount_price;
    });
  }

  handle_btn_click() {
    this.confirmed_order = false;

    setTimeout(() => {
      this.new_order.emit();
    }, 500);
  }

  handle_animation(): string {
    if (!this.confirmed_order) return 'hidden';

    if (this.window_width <= 480) return 'show_mob';
    else return 'show_desk';
  }
}
