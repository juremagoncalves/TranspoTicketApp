import { Component , ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnChanges {

  @Input() dialogTitle!: string;
  @Input() isOpen = false;
  @ViewChild('appDialog', {static: true}) dialog!: ElementRef<HTMLDialogElement>

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen']){
      const change = changes['isOpen'];
      if(change.currentValue){
        this.dialog.nativeElement.showModal();
      }
      else{
        this.dialog.nativeElement.close();
      }
    }
  }
}
