import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketCreatedSource = new Subject<void>();

  // Observable para os componentes se inscreverem
  ticketCreated$ = this.ticketCreatedSource.asObservable();

  // Método para chamar quando o ticket for criado
  notifyTicketCreated() {
    this.ticketCreatedSource.next();
  }
}