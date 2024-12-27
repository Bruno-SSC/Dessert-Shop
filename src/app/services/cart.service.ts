import { Injectable } from '@angular/core';
import { EventManager } from 'src/utils/EventManager';
import { product_item } from 'src/utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private selected_desserts: product_item[] = [];

  constructor() {}

  update_dessert(dessert: product_item): void {
    if (dessert.quantity == 0) {
      this.remove_dessert(dessert.name);
      return;
    }

    let filtered_item = this.selected_desserts.filter(
      (el) => el.name == dessert.name
    )[0];

    if (filtered_item) filtered_item = dessert;
    else this.selected_desserts.push(dessert);

    EventManager.emit('cart_update', this.selected_desserts);
  }

  remove_dessert(dessert_name: string): void | string {
    const index = this.selected_desserts.findIndex(
      (el) => el.name === dessert_name
    );

    if (index === -1) return 'dessert not found!';
    else this.selected_desserts.splice(index, 1);

    EventManager.emit('cart_update', this.selected_desserts);
  }

  retrieve_desserts(): product_item[] {
    return this.selected_desserts;
  }

  clear_cart(): void {
    this.selected_desserts = [];
    EventManager.emit('cart_update', this.selected_desserts);
  }
}
