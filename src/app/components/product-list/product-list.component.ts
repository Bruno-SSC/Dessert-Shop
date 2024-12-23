import { Component } from '@angular/core';
import { product_item, output_event } from 'src/utils/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: product_item[];
  confirmed_order: boolean = false;

  constructor(
    private api_client: ApiService,
    private cart_client: CartService
  ) {
    this.cart_client = cart_client;
    this.products = api_client.retrive_products();
  }

  update_product(data: output_event): void {
    const filtered_item = this.products.filter(
      (el) => el.name === data.product_name
    )[0];

    if (data.update_type == 'add_dessert') {
      filtered_item.selected = true;
      filtered_item.quantity += 1;
    }

    if (data.update_type == 'increase_quantity') filtered_item.quantity += 1;

    if (data.update_type == 'decrease_quantity') {
      filtered_item.quantity -= 1;
      if (filtered_item.quantity > 0) return;
      filtered_item.quantity = 0;
      filtered_item.selected = false;
    }

    this.cart_client.update_dessert(filtered_item);
  }

  remove_dessert(dessert: product_item) {
    const filtered_item = this.products.filter(
      (el) => el.name === dessert.name
    )[0];

    filtered_item.selected = false;
    filtered_item.quantity = 0;
    this.cart_client.remove_dessert(dessert.name);
  }
}

/* 
import { EventManager } from 'src/utils/EventManager';

    EventManager.on('cart_update', (data: product_item[]) => {
      data.forEach((el: product_item) => {
        for (let product of this.products) {
          if (product.name == el.name) product = el;
        }
      });
    });

*/
