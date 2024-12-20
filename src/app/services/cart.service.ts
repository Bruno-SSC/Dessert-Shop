import { Injectable } from '@angular/core';
import { product_item } from 'src/utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private selected_desserts: product_item[] = [];

  constructor() {}

  insert_dessert(dessert: product_item): void {
    this.selected_desserts.push(dessert);
  }
}
