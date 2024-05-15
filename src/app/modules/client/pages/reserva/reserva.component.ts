import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs'; // Importe interval aqui
import { takeWhile } from 'rxjs/operators'; // Importe takeWhile aqui
import { faBank } from '@fortawesome/free-solid-svg-icons';

import { ReservaServiceService } from '../../services/reserva-service.service';
import { Pedido } from 'src/app/modules/dashboard/dashboard/modelos/pedido.interface';
import { ProgramacaoDataServiceService } from '../../services/programacao-data-service.service';
import { Assento } from 'src/app/modules/dashboard/dashboard/modelos/assento.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentoService } from '../../services/pagamento.service';
import { PagamentoDTO } from 'src/app/modules/dashboard/dashboard/modelos/pagamentoDTO.interface';
import { WebsocketsService } from '../../services/websockets.service';
// import { Subscription } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  tempo = 0;
  pedido: Pedido | undefined;
  assento: Assento[] = [];
  referencia!: string;
  valorPago!: number
  dataExpiracao! : Date
  pagamentoDTO: PagamentoDTO = { // Inicialização do pedidoDTO
    referencia: '',
    totalPago: 0,
    tipoPagamento: ''
  };
  pedidoId!: string;
  timeLeft!: number;
  timeExp!:number
  timerSubscription: Subscription | undefined;
  formattedTime= ''
  tipoPagamentoSelecionado!: string;
  faBank = faBank;

  // dataExpiracao

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaServiceService,
    private programacaoDataService: ProgramacaoDataServiceService,
    private pagamentoService: PagamentoService,
    private socketService: WebsocketsService,
    private ticketService: TicketService,
    private location: Location
  ) {
    
   }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const pkPedido = params['id'];
      this.getPedidoByPkPedido(pkPedido);

    })
     this.tipoPagamentoSelecionado = this.programacaoDataService.getTipoPagamento()

    this.tempo = this.programacaoDataService.getTimer()
    console.log("tempo restante " + this.tempo)

  //  const data = new Date(this.dataExpiracao) 
  //   this.timeLeft = data.getTime() / 1000;
  //   console.log("Time " + this.timeLeft)

    // this.route.params.subscribe(params => {
    //   const pkPedido = params['id'];
    //   console.log("id do pedido" + pkPedido)
    //   this.getDataExpiracao(pkPedido);
    // })

    

    this.assento = this.programacaoDataService.getAssentosSelecionados();
    console.log(this.assento)
    this.connectToWebSocket();
  }


  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  getDataExpiracao(pkPedido: string){
    this.reservaService.getDataExpiracao(pkPedido).subscribe({
      next:(res) =>{
        this.dataExpiracao = res
        console.log("O valor da data" + this.dataExpiracao)
      },
      error:(err)=>{
        console.log(JSON.stringify(err))
      }
    })
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
    this.stopTimer();
  }
  connectToWebSocket(): void {
    this.socketService.connectPagamento((data: any) => {
      console.log("ENTROU");
      console.log(data);
      // this.updateSeatList(updateSeat);
    })
  }

  getPedidoByPkPedido(pkPedido: string) {
    this.reservaService.getPedidoById(pkPedido).subscribe({
      next: (res: Pedido) => {
        this.pedido = res;
        console.log(res)
        this.pedidoId = this.pedido.pkPedido
        this.referencia = this.pedido.referencia
        this.valorPago = this.pedido.totalPago
        this.dataExpiracao =  this.pedido.dataExpiracao
        // this.dataExpiracao =  this.pedido.dataExpiracao.getTime()/1000
        if (this.dataExpiracao) {
          const data = new Date(this.dataExpiracao);
          const tempoExpirado = data.getTime()
          // this.timeLeft = (data.getTime() - Date.now()) / 1000;
          this.updateTimeLeft(tempoExpirado);
          // console.log("TimeLeft: " + this.timeLeft);
          this.startTimer();
          console.log("TimeLeft: " + this.timeLeft);
        }
        console.log("Data" + this.dataExpiracao)
      }
    })
  }

  updateTimeLeft(expirationTime: number): void {
    const currentTime = Date.now();
    // this.timeLeft = Math.max(0, (expirationTime - currentTime) / 1000); // tempo restante em segundos
    this.timeExp = Math.max(0, (expirationTime - currentTime) / 1000); // tempo restante em segundos
    this.timeLeft = Math.max(0,(this.timeExp - this.tempo))
    console.log("Tempo real1: " + this.timeLeft)
    console.log("Tempo rea2 Exp: " + this.timeExp)
    console.log("Tempo real 3 timer: " + this.tempo)
  }



  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
     
      if (this.timeLeft <= 0) {
        // Redirecionamento após o tempo expirar
        this.router.navigate(['/cliente/pesquisar-viagens']);
        this.timerSubscription?.unsubscribe(); // Pare o timer
        return; // Saia da função
      }
  
    const minutes: number = Math.floor(this.timeLeft / 60);
    const seconds: number = Math.floor(this.timeLeft % 60);

    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

    this.formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  
      this.timeLeft--;
    });
  }
  
  
  // startTimer(): void {
  //   this.timerSubscription = interval(1000).pipe(
  //     takeWhile(() => this.timeLeft > 0)
  //   ).subscribe(() => {
  //     const minutes = Math.floor(this.timeLeft / 60);
  //     const seconds = this.timeLeft % 60;
  //      this.formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  //     console.log("TimeLeft: " + this.formattedTime);

  //     if (this.timeLeft === 0) {
  //       // Redirecionamento após o tempo expirar
  //       this.router.navigate(['/outra-tela']);
  //     }

  //     this.timeLeft--;
  //   });
  // }

  initPagaamentoDTO() {
    this.pagamentoDTO.referencia = this.referencia
    this.pagamentoDTO.totalPago = this.valorPago
    this.pagamentoDTO.tipoPagamento = this.tipoPagamentoSelecionado
  }
  createTicket() {
    this.initPagaamentoDTO()
    //vai ser feito aqui o pagamento

    this.pagamentoService.createPagamento(this.pagamentoDTO).subscribe({
      next: (res) => {
        console.log("Pagamento feito com sucesso")

      },
      error: (err) => {
        console.log(JSON.stringify(err))
      }
    })
    this.ticketService.notifyTicketCreated();
    this.programacaoDataService.openDialog();
    this.router.navigate(['/cliente/bilhete',this.pedidoId]);
  }

  voltar(): void {
    this.location.back();
  }
}