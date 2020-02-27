import { FormControl } from '@angular/forms';

import { DataService } from '../services/data.service';
import { FormElementBase } from './form.element.base';

export class FormElementInputAutocomplete extends FormElementBase<string> {
  private dataService: DataService<string>;
  type = 'autocomplete';
  data = { options: [] };
  selection = { current: -1 };

  constructor(options: {} = {}, dataService: DataService<string>) {
      super(options);
      this.dataService = dataService;
  }

  public fetchSelect = (event: UIEvent, index?: number, control?: FormControl) => {
    if (event.type.startsWith('key')) {
      this.handleKeyboardEvent(<KeyboardEvent> event);
    } else {
      this.handleMouseEvent(<MouseEvent> event, index, control);
    }
  };

  private handleMouseEvent(event: MouseEvent, index: number, control: FormControl) {
    if (event.type === 'mouseover') {
      this.selection.current = index;
      control.setValue(this.selectedValue());
    } else if (event.type === 'click') {
      this.unselect();
    }
  }

  private handleKeyboardEvent(event: KeyboardEvent) {
    let keyCode = event.code ? +event.code : +event.keyCode;
    if (this.isTextKey(keyCode)) {
      this.fetchData(event.target['value']);
    }
    else {
      if (this.isArrowDownKey(keyCode)) {
        event.target['value'] = this.increaseSelection();
      }
      else if (this.isArrowUpKey(keyCode)) {
        event.target['value'] = this.decreaseSelection();
      }
      else if (this.isEnterKey(keyCode)) {
        if (event.target['value'] === this.data.options[this.selection.current].value) {
          this.unselect();
        }
      }
    }
  }

  private fetchData(value: string){
    this.dataService.fetch(value)
      .subscribe(data => {
        this.data.options = [];
        for (let i = 0, len = data.length; i < len; i++) {
          let key = Object.keys(data[i])[0];
          this.data.options.push({ key: key, value: data[i][key]});
        }
      }
    );
  }

  private increaseSelection() {
    this.selection.current = this.selection.current + 1;
    if (this.selection.current === this.data.options.length) {
      this.selection.current = 0;
    }
    return this.selectedValue();
  }

  private decreaseSelection() {
    this.selection.current = this.selection.current - 1;
    if (this.selection.current < 0) {
      this.selection.current = this.data.options.length - 1;
    }
    return this.selectedValue();
  }

  private selectedValue() {
    if (this.data.options[this.selection.current] !== undefined) {
      return this.data.options[this.selection.current].value;
    } else {
      return "";
    }
  }

  private unselect() {
    this.data.options = [];
    this.selection.current = -1;
  }

  private isArrowUpKey(keyCode: number) {
    return keyCode == 38;
  }

  private isArrowDownKey(keyCode: number) {
    return keyCode == 40;
  }

  private isEnterKey(keyCode: number) {
    return keyCode == 13;
  }

  private isTextKey(keyCode: number) {
    return (keyCode > 47 && keyCode < 58) || //number keys
      (keyCode === 32 || keyCode === 8 || keyCode === 46) || //space bar, backspace, delete
      (keyCode > 64 && keyCode < 91) || //letter keys
      (keyCode > 95 && keyCode < 112) || //numpad keys
      (keyCode > 185 && keyCode < 193) || //;=,-./' (in order)
      (keyCode > 219 && keyCode < 223); //[\]' (in order)
  }
}