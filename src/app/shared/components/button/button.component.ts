import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() typeBtn: 'login-Resgister' | 'add-btn-with-border' |'add-item' |'add-itemModal'
                    | 'delete-button' | 'btn-filter' = 'add-item';
  @Input() text: string = '';

  @Input() disabled = false;
  
  @Input()loading: boolean = false;

  @Input() type: string = '';

  @Output() clickEvent = new EventEmitter<any>();

  // @Output() clickEvent = new EventEmitter<any>();

  onButtonClick(){
    this.clickEvent.emit();
  }
}
