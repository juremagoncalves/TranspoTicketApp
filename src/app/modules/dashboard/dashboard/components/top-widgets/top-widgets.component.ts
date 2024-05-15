import { Component } from '@angular/core';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
  faTicketAlt = faTicketAlt;
}
