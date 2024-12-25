import { Component } from '@angular/core';
import { product_item, output_event } from 'src/utils/interfaces';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        group([
          query('.dessert_container, .dessert_list__title, .dessert_cart', [
            style({ opacity: 0, transform: 'translateY(-100px)' }),
            stagger(30, [
              animate(
                '1000ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' })
              ),
            ]),
          ]),
          query('@slow_show', [animateChild()]),
        ]),
      ]),
    ]),
    trigger('modal_pop', [
      transition('void => show_mob', [
        group([
          query('.confirm_order', [
            style({ transform: 'translateY(100vh)' }),
            animate('600ms ease-in'),
            style({ transform: 'translateY(0vh)' }),
          ]),
          query('.black_layer', [
            style({ opacity: 0 }),
            animate('500ms ease'),
            style({ opacity: 1 }),
          ]),
        ]),
      ]),
      transition('show_mob => void', [
        group([
          query('.confirm_order', [
            animate('600ms ease-in'),
            style({ transform: 'translateY(100vh)' }),
          ]),
          query('.black_layer', [animate('500ms ease'), style({ opacity: 0 })]),
        ]),
      ]),
      transition('void => show_desk', [
        query('.confirm_order, .black_layer', [
          style({ opacity: 0 }),
          animate('500ms ease'),
          style({ opacity: 1 }),
        ]),
      ]),
      transition('show_desk => void', [
        query('.confirm_order, .black_layer', [
          animate('500ms ease'),
          style({ opacity: 0 }),
        ]),
      ]),
    ]),
  ],
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

  modal_animation(): string {
    if (window.innerWidth <= 480) return 'show_mob';
    return 'show_desk';
  }
}
