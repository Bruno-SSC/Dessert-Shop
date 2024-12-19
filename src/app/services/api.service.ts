import { Injectable } from '@angular/core';
import { product_item } from 'src/utils/interfaces';
import { products as prod_data } from 'src/utils/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private products: product_item[] = prod_data;

  // I think you create a observable and then subscribe to it.
  // I was thinking about it in the wrong way. They are much more like an event emitter.
  // observables are as the name implies, something to be observed.
  // whenever some type of data is updated, you want multiple places to update.
  
  // the cart service receives the products from the product list 
  // it will have a list observable
  // the cart component will be watching the mentioned list 
  
  constructor() {}

  retrive_products(): product_item[] {
    const list = [...this.products];
    return list;
  }
}
