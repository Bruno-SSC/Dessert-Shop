import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { product_item } from 'src/utils/interfaces';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Output() new_order = new EventEmitter<void>();
  checkout_price: number = 0;
  checkout_items: product_item[] = [
    {
      image: {
        thumbnail: './assets/images/image-waffle-thumbnail.jpg',
        mobile: './assets/images/image-waffle-mobile.jpg',
        tablet: './assets/images/image-waffle-tablet.jpg',
        desktop: './assets/images/image-waffle-desktop.jpg',
      },
      name: 'Waffle with Berries',
      category: 'Waffle',
      price: 6.5,
      quantity: 0,
    },
    {
      image: {
        thumbnail: './assets/images/image-creme-brulee-thumbnail.jpg',
        mobile: './assets/images/image-creme-brulee-mobile.jpg',
        tablet: './assets/images/image-creme-brulee-tablet.jpg',
        desktop: './assets/images/image-creme-brulee-desktop.jpg',
      },
      name: 'Vanilla Bean Crème Brûlée',
      category: 'Crème Brûlée',
      price: 7.0,
      quantity: 0,
    },
  ];

  constructor(private cart_client: CartService) {
    this.checkout_items = [...cart_client.retrieve_desserts()];

    this.checkout_price = 0;
    this.checkout_items.forEach((el) => {
      const amount_price = el.price * el.quantity;
      this.checkout_price += amount_price;
    });
  }
}
