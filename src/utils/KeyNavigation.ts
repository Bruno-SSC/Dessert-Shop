import { focusable_object } from './interfaces';

export default class KeyNavigation {
  public static total_count: number = 1;
  private static all_elements: focusable_object[] = [];
  private static active_index: number = 0;

  static init() {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      e.preventDefault(); // prevent default focus switch
      KeyNavigation.handle_keys(e);
    });
  }

  static add_element(confirm: () => void, cancel: () => void) {
    KeyNavigation.all_elements.push({
      tabindex: KeyNavigation.total_count,
      confirm,
      cancel,
    });

    KeyNavigation.total_count += 1;
  }

  static handle_keys(e: KeyboardEvent) {
    let index = KeyNavigation.active_index;

    if (e.key == 'Tab' && index < KeyNavigation.total_count) index += 1;
    if (e.key == 'Shift' && index > 0) index -= 1;

    // ! The numbers below aren't matching at all.
    console.log(index);
    console.log(KeyNavigation.total_count);
    console.log(KeyNavigation.all_elements);
    const curr_focus = KeyNavigation.all_elements[index];

    const selected = document.querySelector(
      `[tabindex="${curr_focus.tabindex}"]`
    ) as HTMLElement;

    if (e.key == 'Enter') curr_focus.confirm();
    if (e.key == 'Backspace') curr_focus.cancel();
  }

  static update_focus() {
    // TODO: use it to change the focused element manually
  }
}
