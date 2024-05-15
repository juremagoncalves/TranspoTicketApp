import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';


// import { RxStompService } from '@stomp/ng2-stompjs';

import { RxStompService } from '@stomp/ng2-stompjs';
import { ClientRoutingModule } from './client-routing.module';
// import { ButtonComponent } from 'src/app/shared/components/button/button.component';
// import { DashboardModule } from './modules/dashboard/dashboard/dashboard.module';
import { DashboardModule } from '../dashboard/dashboard/dashboard.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { ProgramacaoViagemComponent } from './pages/programacao-viagem/programacao-viagem.component';
import { SeatandpaymentComponent } from './pages/seatandpayment/seatandpayment.component';
import { DialogModule } from 'primeng/dialog';
import { PesquisarViagensComponent } from './pages/pesquisar-viagens/pesquisar-viagens.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BilheteComponent } from './pages/bilhete/bilhete.component';
//import { MinhasReservasComponent } from './pages/minhas-reservas/minhas-reservas.component';


@NgModule({
  declarations: [
    NavbarComponent,
    IndexComponent,
    ProgramacaoViagemComponent,
    SeatandpaymentComponent,
    PesquisarViagensComponent,
    ReservaComponent,
    BilheteComponent,
   // MinhasReservasComponent,
    // ButtonComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    DropdownModule,
    CalendarModule,
    DashboardModule,
    ReactiveFormsModule,
    DialogModule,
    TooltipModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    
    // ButtonComponent

  ],
  providers: [RxStompService],
})
export class ClientModule { }
