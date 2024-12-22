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
    let filtered_item = this.selected_desserts.filter(
      (el) => el.name == dessert.name
    )[0];

    console.log(filtered_item);

    if (filtered_item) filtered_item = dessert;
    else this.selected_desserts.push(dessert);

    EventManager.emit('cart_update', this.selected_desserts);
  }

  remove_dessert(dessert_name: string) {
    EventManager.emit('cart_update', this.selected_desserts);
  }

  retrieve_desserts() {
    return this.selected_desserts;
  }
}
