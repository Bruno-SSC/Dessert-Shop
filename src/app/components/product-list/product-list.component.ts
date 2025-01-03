import { Component } from '@angular/core';
import { product_item, output_event } from 'src/utils/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import KeyNavigation from 'src/utils/KeyNavigation';
import { modal_pop, page_animation } from 'src/utils/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [page_animation, modal_pop],
})
export class ProductListComponent {
  products: product_item[];
  tabindexes: number[] = [];
  confirmed_order: boolean = false;

  constructor(
    private api_client: ApiService,
    private cart_client: CartService
  ) {
    this.products = this.api_client.retrive_products();

    // avoids ng0100 error of using dynamic values in bindings during template rendering.
    this.products.forEach((product) => {
      const confirm_cb = () => {
        this.update_product({
          product_name: product.name,
          update_type: 'increase',
        });
      };

      const cancel_cb = () => {
        this.update_product({
          product_name: product.name,
          update_type: 'decrease',
        });
      };

      const tabindex = KeyNavigation.add_element(confirm_cb, cancel_cb);
      this.tabindexes.push(tabindex);
    });
  }

  update_product(data: output_event): void {
    const filtered_item = this.products.filter(
      (el) => el.name === data.product_name
    )[0];

    if (data.update_type === 'add') {
      filtered_item.selected = true;
      filtered_item.quantity += 1;
    }

    if (data.update_type === 'increase') {
      filtered_item.selected = true; // in case the keyboard is used to increase withouth adding
      filtered_item.quantity += 1;
    }

    if (data.update_type === 'decrease') {
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

  modal_animation(): string {
    if (window.innerWidth <= 480) return 'show_mob';
    return 'show_desk';
  }

  handle_new_order() {
    this.confirmed_order = false;
    this.products = this.api_client.retrive_products();
    this.cart_client.clear_cart();
  }
}
