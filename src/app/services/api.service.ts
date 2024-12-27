import { Injectable } from '@angular/core';
import { product_item } from 'src/utils/interfaces';
import { products as prod_data } from 'src/utils/data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private products: product_item[] = prod_data;

  constructor() {}

  retrive_products(): product_item[] {
    const unlinked_list = JSON.stringify(this.products);
    return [...JSON.parse(unlinked_list)];
  }
}
