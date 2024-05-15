import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { IndexComponent } from './components/index/index.component';
import { ProgramacaoViagemComponent } from './pages/programacao-viagem/programacao-viagem.component';
import { SeatandpaymentComponent } from './pages/seatandpayment/seatandpayment.component';
import { PesquisarViagensComponent } from './pages/pesquisar-viagens/pesquisar-viagens.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BilheteComponent } from './pages/bilhete/bilhete.component';
// import { MinhasReservasComponent } from './pages/minhas-reservas/minhas-reservas.component';

const routes: Routes = [
  {path: '', component: ClientComponent, children:[
    { path: 'home', component: IndexComponent },
    { path: 'programacao', component: ProgramacaoViagemComponent },
    { path: 'selecionar-assento', component: SeatandpaymentComponent },
    { path: 'pesquisar-viagens', component: PesquisarViagensComponent},
    { path: 'pagamento/:id', component: ReservaComponent},
    { path: 'bilhete/:idPedido', component: BilheteComponent},
    // { path: 'minhas-reservas', component: MinhasReservasComponent}



  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

