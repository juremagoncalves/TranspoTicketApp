import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor{

  // @Input() formControlName!: string;
  @Input() options: any[] = [];
  @Input() optionLabel!: string;
  @Input() placeholder!: string;
  @Input() filter = false;
  @Input() filterBy!: string;
  @Input() showClear = false;
  @Input() control!:FormControl;
  @Input() formControlName: string | null = null;

  selectedValue: any = null;
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
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

  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

}
