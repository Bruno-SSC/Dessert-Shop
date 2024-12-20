import { Component, Input } from '@angular/core';
import { product_item } from 'src/utils/interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  selected: boolean = false;
  quantity: number = 0;
  @Input() product: product_item = {} as product_item;

  add_dessert(): void {
    this.selected = true;
    this.quantity = 1;
  }

  decrese_quantity(): void {
    if (this.quantity > 1) this.quantity -= 1;
    else this.selected = false;
   
  }

  increase_quantity(): void {
    this.quantity += 1;
  }
}
