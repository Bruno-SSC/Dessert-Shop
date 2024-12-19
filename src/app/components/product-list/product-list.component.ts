import { Component } from '@angular/core';
import { product_item } from 'src/utils/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: product_item[];

  constructor(private api_client: ApiService) {
    this.products = api_client.retrive_products();
  }
}
