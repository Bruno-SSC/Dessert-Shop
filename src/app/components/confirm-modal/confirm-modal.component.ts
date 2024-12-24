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
      state('visible', style({ transform: 'translateY(-100%)', opacity: 1 })),
      transition('void <=> visible', animate('500ms ease-in')),
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
    this.new_order.emit();
  }

  handle_animation(): string {
    if (this.window_width >= 480) return 'void';

    if (this.confirmed_order) return 'visible';
    else return 'void';
  }
}
