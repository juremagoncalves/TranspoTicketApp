import { Component,EventEmitter,Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label: string = "";
  @Input() type: string = "";
  @Input() id: string = "";
  @Input() placeholder: string = "";
  @Input() control!:FormControl;
  @Input() isReadOnly = false;
  // @Input() value: string = "";


  value: string = '';
  onChange: any = () => {};
  // onChange:(value: string | null) => void = () => {}; 
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    this.onTouched();
  }


  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | null;
    if (input) {
      this.onChange(input.value);
    }
  }
}
  