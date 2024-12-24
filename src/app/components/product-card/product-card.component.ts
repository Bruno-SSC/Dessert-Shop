import { Component, EventEmitter, Input, Output } from '@angular/core';
import { product_item, output_event } from 'src/utils/interfaces';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('slow_show', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('void => appear', animate('500ms 500ms')),
      transition('appear => void', animate(500)),
    ]),
  ],
})
export class ProductCardComponent {
  window_width = window.innerWidth;
  @Input() product: product_item = {} as product_item;
  @Output() update_product = new EventEmitter<output_event>();

  choose_img(): string {
    if (this.window_width <= 480) return this.product.image.mobile;
    if (this.window_width <= 769) return this.product.image.tablet;
    return this.product.image.desktop;
  }
}
