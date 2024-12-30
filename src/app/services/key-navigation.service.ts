import { Injectable } from '@angular/core';
import { EventManager } from 'src/utils/EventManager';

interface focusable_element {
  tabindex: number;
  confirm: () => void;
  cancel: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class KeyNavigationService {
  private static all_elements: focusable_element[] = [];
  private static curr_index: number = 0;

  private static curr_focus: focusable_element = {
    tabindex: 0,
    confirm: () => console.log('no focusable element'),
    cancel: () => {},
  };

  constructor() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault(); // prevent default focus switch
      KeyNavigationService.handle_keys(e);
    });
  }

  add_element(confirm: () => void, cancel: () => void) {
    const tabindex = KeyNavigationService.all_elements.length;

    const new_element = {
      tabindex,
      confirm,
      cancel,
    };

    KeyNavigationService.all_elements.push(new_element);

    return new_element.tabindex;
  }

  static handle_keys(e: KeyboardEvent) {
    const index = KeyNavigationService.curr_index;

    if (e.key == 'Tab') {
      KeyNavigationService.curr_index += 1;
    }

    if (e.key == 'Shift' && index > 0) {
      KeyNavigationService.curr_index -= 1;
    }

    KeyNavigationService.curr_focus = KeyNavigationService.all_elements[index];
    KeyNavigationService.update_focus();

    if (e.key == 'Enter') {
      KeyNavigationService.curr_focus.confirm();
    }

    if (e.key == 'Backspace') {
      KeyNavigationService.curr_focus.cancel();
    }
  }

  static update_focus() {
    // TODO: use it to change the focused element manually
    EventManager.emit('focus_updated');
  }
}
