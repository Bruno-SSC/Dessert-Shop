import { Component, EventEmitter, Input, Output } from '@angular/core';
import { item_fade } from 'src/utils/animations';
import { product_item, output_event, update_types } from 'src/utils/interfaces';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [item_fade],
})
export class ProductCardComponent {
  window_width = window.innerWidth;
  @Input() product: product_item = {} as product_item;
  @Output() update_product = new EventEmitter<output_event>();

  constructor() {}

  choose_img(): string {
    if (this.window_width <= 480) return this.product.image.mobile;
    if (this.window_width <= 769) return this.product.image.tablet;
    return this.product.image.desktop;
  }

  handle_product_update(type: update_types) {
    this.update_product.emit({
      product_name: this.product.name,
      update_type: type,
    });
  }
}
