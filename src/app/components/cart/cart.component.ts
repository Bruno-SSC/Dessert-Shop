import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { EventManager } from 'src/utils/EventManager';
import { product_item } from 'src/utils/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  selected_products: product_item[] = [];
  total_price = 0;

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
