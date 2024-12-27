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

// ? Effects

const move_in = [
  style({ transform: 'translateY(100vh)' }),
  animate('600ms ease-in'),
  style({ transform: 'translateY(0vh)' }),
];

const move_out = [
  animate('600ms ease-in'),
  style({ transform: 'translateY(100vh)' }),
];

const fade_in = [
  style({ opacity: 0 }),
  animate('500ms ease'),
  style({ opacity: 1 }),
];

const fade_out = [animate('500ms ease'), style({ opacity: 0 })];

// ? Animations

export const page_animation = trigger('page_animation', [
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
]);

export const modal_pop = trigger('modal_pop', [
  transition('void => show_mob', [
    group([query('.confirm_order', move_in), query('.black_layer', fade_in)]),
  ]),
  transition('show_mob => void', [
    group([query('.confirm_order', move_out), query('.black_layer', fade_out)]),
  ]),
  transition('void => show_desk', [
    query('.confirm_order, .black_layer', fade_in),
  ]),
  transition('show_desk => void', [
    query('.confirm_order, .black_layer', fade_out),
  ]),
]);
