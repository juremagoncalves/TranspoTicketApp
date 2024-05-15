import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ProgramacaoDataServiceService } from './../../services/programacao-data-service.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Assento } from 'src/app/modules/dashboard/dashboard/modelos/assento.interface';
import { EstadoAssento } from 'src/app/modules/dashboard/dashboard/modelos/estadoAssento';
import { AssentoService } from 'src/app/modules/dashboard/dashboard/services/assento.service';
import { Programacao } from 'src/app/modules/dashboard/dashboard/modelos/programacao.interface';
import { WebsocketsService } from '../../services/websockets.service';
import { ReservaTemporaria } from '../../modelos/reserva_temporaria.interface';
import { ReservaTemporariaService } from '../../services/reserva-temporaria.service';
import { PedidoDTO } from 'src/app/modules/dashboard/dashboard/modelos/pedidoDTO.interface';
import { ReservaServiceService } from '../../services/reserva-service.service';
import { Pedido } from 'src/app/modules/dashboard/dashboard/modelos/pedido.interface';
import { TicketService } from '../../services/ticket.service';
import { ProgramacaoService } from 'src/app/modules/dashboard/dashboard/services/programacao.service';
declare var localStorage: Storage;

@Component({
  selector: 'app-seatandpayment',
  templateUrl: './seatandpayment.component.html',
  styleUrls: ['./seatandpayment.component.css']
})
export class SeatandpaymentComponent implements OnInit {
  private subscription!: Subscription;

  seats: HTMLElement[][] = [];
  assentoList: Assento[] = [];
  reservaAssentoTemporarioList: ReservaTemporaria[] = [];
  programacaoList: Programacao[] = [];
  auxAssentoList: Assento[] = [];
  isDialogOpenAssento = false;
  isDialogOpenTimer = false;
  timeLeft: number = 300;
  // timeLeft: number = 30;
  interval!: any;
  formatedTime: string = '';
  diaSemana!: string;
  data!: Date;
  origem!: string;
  destino!: string;
  preco!: number;
  cont = 0;
  total!: number;
  horaPartida!: string;
  horaChegada!: string;
  usuarioId: string | null = null;
  pedido!: Pedido;
  programacao: Programacao | undefined
  idProgramacao!:string

  tipoPagamentoSelecionado: string | null = null; // Nenhum método de pagamento selecionado inicialmente

  nomeBotaoPagamento: string = 'Pagamento'; // Nome inicial do botão
  // preco!:number
  // pedidoDTO!: PedidoDTO;
  pedidoDTO: PedidoDTO = { // Inicialização do pedidoDTO
    entidade: '',
    pkProgramacao: '',
    pkUser: '',
    totalPago: 0,
    assentosSelecionados:[]
  };





  @ViewChild('assento') assentoRef!: ElementRef;

  constructor(
    private ticketService: TicketService,
    private assentoService: AssentoService,
    private programacaoDataService: ProgramacaoDataServiceService,
    private webSocketService: WebsocketsService,
    // private renderer: Renderer2,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private reservaTemporariaService : ReservaTemporariaService,
    private reservaService: ReservaServiceService,
    private route: ActivatedRoute,
    private programacaoService: ProgramacaoService,
    private location: Location
    
  ) {
    this.usuarioId = localStorage.getItem('pkUsuario');
  }




  ngOnInit(): void {
    this.programacaoList = this.programacaoDataService.getProgramacoes();
    this.startTimer();
    this.formatTime();
    //this.initDadosProgramacao();
    this.connectToWebSocket();
    this.getReservasTemporarias();

    this.subscription = this.ticketService.ticketCreated$.subscribe(() => {
      // Reagir à criação do ticket, talvez reconectando ou realizando outra ação
      this.connectToWebSocket();
    });

    this.route.queryParams.subscribe(params => {
      this.idProgramacao = params['idProgramacao']; 
      this.programacaoService.findById(this.idProgramacao).subscribe({
       next: (res) =>{
        this.programacao = res
        // console.log(this.programacao.fkTransporte.fkClasseServico.designacao)
       } 
      })
      // console.log(idProgramacao)
      
       this.preco = params['preco']; 
       console.log(this.preco)
     
  
    });
    this.initDadosProgramacao();
  }

  // findProgramacaoByIdProgramacao(){
  //   this.programacaoService.findById()
  // }

  getReservasTemporarias(){
    console.log("ENTRAMOS NAS RESERVAS TEMPORARIAS aqui")
    this.reservaTemporariaService.findALL().subscribe({
      next:(res) =>{
        this.reservaAssentoTemporarioList = res;
        console.log(res)
      }, 
      error: (err) =>{
        console.log(JSON.stringify(err))
      }
    })
  }

  setUserIdInSeats(row: number, col: number, pkAssento: string) {
    for (let index = 0; index < this.reservaAssentoTemporarioList.length; index++) {
      if (pkAssento == this.reservaAssentoTemporarioList[index].assento.pkAssento) {
        let currentUserId = this.reservaAssentoTemporarioList[index].user.pkUsuario;
        this.seats[row][col].setAttribute('usuario-id', currentUserId); 
      }
    }
  }

  connectToWebSocket(): void {
    this.webSocketService.connect((updateSeat: any) => {
      console.log("ENTROU");
      console.log(updateSeat);
      this.updateSeatList(updateSeat);
    })
  }

  

  // updateSeatList(updateSeat: any): void{
  //   const index = this.assentoList.findIndex(assento => assento.pkAssento === updateSeat.pkAssento);
  //   console.log("Antes");
  //   if(index !== -1){
  //     this.assentoList[index] = updateSeat;
  //     this.changeDetectorRef.detectChanges();
  //     console.log("Depois");
  //   }
  // }

  // updateSeatList(updateSeat: any): void {
  //   const seatId = updateSeat.pkAssento;

  //   // Encontrar e atualizar o estado do assento na matriz de assentos
  //   for (let row = 0; row < this.seats.length; row++) {
  //     for (let col = 0; col < this.seats[row].length; col++) {
  //       const seat = this.seats[row][col];
  //       if (seat.id === seatId) {
  //         // Atualizar o estado do assento na matriz
  //         seat.estado = updateSeat.estado;

  //         // Encontrar o elemento HTML do assento
  //         const seatElement = document.getElementById(seatId);
  //         if (seatElement) {
  //           // Atualizar as classes CSS do elemento com base no estado do assento
  //           if (updateSeat.estado === 'RESERVADO') {
  //             seatElement.classList.remove('available');
  //             seatElement.classList.add('reserved');
  //           } else {
  //             seatElement.classList.remove('reserved');
  //             seatElement.classList.add('available');
  //           }

  //           // Forçar a detecção de mudanças no Angular
  //           this.changeDetectorRef.detectChanges();
  //         } else {
  //           console.error('Elemento de assento não encontrado com ID:', seatId);
  //         }
  //       }
  //     }
  //   }
  // }




  //aCHO QUE FUNC
  // updateSeatList(updateSeat: any): void {
  //   const seatId = updateSeat.pkAssento;

  //   // Encontrar e atualizar o estado do assento na matriz de assentos
  //   this.seats.forEach((seatRow: HTMLElement[]) => {
  //     seatRow.forEach((seatElement: HTMLElement) => {
  //       if (seatElement.getAttribute('id-assento') === seatId) {
  //         if (updateSeat.estado === 'RESERVADO') {
  //           seatElement.classList.remove('available');
  //           seatElement.classList.add('reserved');
  //         } else {
  //           seatElement.classList.remove('reserved');
  //           seatElement.classList.add('available');
  //         }
  //         // Forçar a detecção de mudanças para atualizar a exibição
  //        // this.changeDetectorRef.detectChanges();
  //       }
  //     });
  //   });

  //   this.findAllAssentoByPkTransporte();
  // }

  // updateSeatList(updateSeat: any): void {
  //   let found = false;

  //   // Percorra a matriz de assentos
  //   for (let row = 0; row < this.seats.length; row++) {
  //     for (let col = 0; col < this.seats[row].length; col++) {
  //       const seatElement = this.seats[row][col];
  //       const seatId = seatElement.getAttribute('id-assento');

  //       // Verifique se o ID do assento corresponde ao ID recebido
  //       if (seatId === updateSeat.pkAssento) {
  //         found = true;

  //         // Atualize o estado do assento com base nas informações recebidas
  //         if (updateSeat.estado === 'RESERVADO') {
  //           // Atualize a classe CSS para refletir o estado do assento
  //           seatElement.classList.remove('available');
  //           seatElement.classList.add('reserved');
  //         } else {
  //           seatElement.classList.remove('reserved');
  //           seatElement.classList.add('available');
  //         }

  //         // Saia do loop assim que encontrar o assento correspondente
  //         break;
  //       }
  //     }

  //     if (found) {
  //       this.changeDetectorRef.detectChanges();
  //       // Saia do loop externo também
  //       break;
  //     }
  //   }
  // }

  regenerateSeatList(seatId: String, estado: any) {
    console.log("REGENERATE");

    for (let row = 0; row < this.seats.length; row++) {
      for (let col = 0; col < this.seats[row].length; col++) {
        const seatElement = this.seats[row][col];
        const currentSeatId = seatElement.getAttribute('id-assento');



        // Verifique se o ID do assento corresponde ao ID recebido
        if (currentSeatId === seatId) {
          // Atualize o estado do assento com base nas informações recebidas
          if (estado === 'RESERVADO') {
            console.log("Entrei Reservado II");
            // Atualize a classe CSS para refletir o estado do assento
            seatElement.classList.remove('available');
            seatElement.classList.add('reserved');
            this.seats[row][col].setAttribute('estado', 'RESERVADO');
          } else {
            console.log("Entrei Disponivel II");
            seatElement.classList.remove('reserved');
            seatElement.classList.add('available');
            this.seats[row][col].setAttribute('estado', 'DISPONIVEL');
          }

 

          // Saia do loop assim que encontrar o assento correspondente
          // break;
          this.changeDetectorRef.detectChanges();
        }
      }
    }
  }

  updateSeatList(updateSeat: any): void {
    let found = false;

    for (let row = 0; row < this.seats.length; row++) {
      for (let col = 0; col < this.seats[row].length; col++) {
        const seatElement = this.seats[row][col];
        const seatId = seatElement.getAttribute('id-assento');



        // Verifique se o ID do assento corresponde ao ID recebido
        if (seatId === updateSeat.pkAssento) {
          found = true;
          console.log("Entrei");

          console.log(this.seats[row][col]);

          // Atualize o estado do assento com base nas informações recebidas
          if (updateSeat.estado === 'RESERVADO') {
            console.log("Entrei Reservado");
            // Atualize a classe CSS para refletir o estado do assento
            seatElement.classList.remove('available');
            seatElement.classList.add('reserved');
            this.seats[row][col].setAttribute('estado', 'RESERVADO');
          }
           else if(updateSeat.estado === 'INATIVO'){
            seatElement.classList.remove('reserved');
            seatElement.classList.add('inativo');
            this.seats[row][col].setAttribute('estado', 'INATIVO');
          } else {
            console.log("Entrei Disponivel");
            seatElement.classList.remove('reserved');
            seatElement.classList.add('available');
            this.seats[row][col].setAttribute('estado', 'DISPONIVEL');
          }



          // Saia do loop assim que encontrar o assento correspondente
          // break;
          this.changeDetectorRef.detectChanges();
        }
      }

      if (found) {

        // Saia do loop externo também
        // break;
      }
    }

  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    this.subscription.unsubscribe();
  }

  initDadosProgramacao() {
    // this.diaSemana = this.programacao.diaSemana
    // // console.log("hhh " + this.diaSemana)
    // this.data = this.programacao.dataViagem;
    // this.destino = this.programacao.fkRota.fkProvinciaDestino.designacao;
    // this.origem = this.programacao.fkRota.fkProvinciaOrigem.designacao;
    // // this.preco = this.programacaoList[0].fkRota.preco;
    // this.horaPartida = this.programacao.horaPartida;
    // this.horaChegada = this.programacao.horaChegada;
    this.total = this.preco * this.cont;
    console.log("totalll " + this.total)
    
  }

  continuar() {
    this.isDialogOpenAssento = false;
    this.total = this.preco * this.cont;
    // console.log("totalll " + this.total)
  }

  onCancel() {
    this.isDialogOpenAssento = false;
    this.total = this.preco * this.cont;
    if (this.timeLeft == 0) {

      this.timeLeft = 300
      this.startTimer();
    }
  }

  generateSeats(quantity: number): void {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaa")
    this.seats = [];
    let remainingSeats = quantity;
    let seatNumber = 1;

    while (remainingSeats > 0) {

      const seatRow: HTMLElement[] = [];
      const rowSize = Math.min(remainingSeats, 4);

      for (let j = 0; j < rowSize; j++) {
        const seat = document.createElement('div');
        // seat.classList.add('reserved');


        // console.log(seat);
        seatRow.push(seat);
      }

      this.seats.push(seatRow);
      remainingSeats -= rowSize;
      // console.log("tttttt " + this.seats)
      // console.log("hhhhhhhhh " + seatRow)
    }
  }

  shouldRenderCorridor(rowSize: number, index: number): boolean {
    return rowSize === 4 && index === 1;
  }

  findAllAssentoByPkTransporte() {
    const pkTransporte = this.programacaoDataService.getPkTransporte()
    const capacidade = this.programacaoDataService.getCapacidade();

    this.generateSeats(capacidade);

    this.assentoService.findAssentoBypkTransporte(pkTransporte).subscribe({
      next: (res: Assento[]) => {
        this.assentoList = res;

        // Associar os números de assentos da base de dados aos assentos gerados
        for (let i = 0; i < this.assentoList.length; i++) {
          console.log(this.assentoList[i])
          const assento = this.assentoList[i];
          const row = Math.floor(i / 4);
          const col = i % 4;

          this.seats[row][col].innerText = assento.numeroAssento;
          this.seats[row][col].setAttribute('id-assento', assento.pkAssento);

          // Verificar se o assento está na auxAssentoList
          if (this.auxAssentoList.some(selectedAssento => selectedAssento.pkAssento === assento.pkAssento)) {
            this.seats[row][col].setAttribute('estado', 'RESERVADO');
            this.seats[row][col].setAttribute('usuario-id', this.usuarioId|| ''); 
          }
          // else{
          //   this.seats[row][col].setAttribute('estado', 'DISPONIVEL');
          //   // this.seats[row][col].setAttribute('usuario-id', null); // Configura o 'usuario-id' como null para assentos disponíveis
          //   this.seats[row][col].removeAttribute('usuario-id');
          // }
          // else{
          //   this.seats[row][col].setAttribute('estado', 'DISPONIVEL');
          // }
          // trazer os estados reservados
          if (this.assentoList[i].estado.toString() == EstadoAssento[EstadoAssento.RESERVADO]) {
            this.seats[row][col].setAttribute('estado', 'RESERVADO');
            // console.log(assento.estado.toString());
          }

          if (this.assentoList[i].estado.toString() == EstadoAssento[EstadoAssento.INATIVO]) {
            this.seats[row][col].setAttribute('estado', 'INATIVO');
            // console.log(assento.estado.toString());
          }

          this.setUserIdInSeats(row, col, assento.pkAssento);
        }

      },
      error: (err) => {
        console.log("Erro ao buscar assentos: " + err);
      }
    });
    this.isDialogOpenAssento = true;
  }


  // toggleSeatState(assentoId: string): void {
  //   if (assentoId) {
  //     let newState: EstadoAssento;
  //     const usuarioLogadoId = localStorage.getItem('pkUsuario')
  //     const assentoElement = document.querySelector(`[id-assento="${assentoId}"]`) as HTMLElement;

  //     if (assentoElement) {

  //       // const isReserved = assentoElement.classList.contains("reserved");

  //       // if (isReserved && this.usuarioId !== assentoElement.getAttribute('usuario-id')) {
  //       //   console.log("Entrei 2222222" + usuarioLogadoId)
  //       //   alert('Este assento já foi reservado por outro usuário.');
  //       //   return;
  //       // }
  //       if (assentoElement.classList.contains("reserved")) {
  //         newState = EstadoAssento.DISPONIVEL;
  //         assentoElement.classList.remove("reserved");
  //         assentoElement.classList.add("available");
  //         this.removeFromAuxAssentoList(assentoId);
  //         this.cont--;
  //         this.total = this.preco * this.cont;
  //         assentoElement.setAttribute('estado', 'DISPONIVEL');

  //       } else {
  //         newState = EstadoAssento.RESERVADO;
  //         assentoElement.classList.remove("available");
  //         assentoElement.classList.add("reserved");
  //         const assento = this.assentoList.find(assento => assento.pkAssento === assentoId)
  //         if (assento) {
  //           this.auxAssentoList.push(assento);
  //           this.cont++;
  //           this.total = this.preco * this.cont;
  //         }
  //         assentoElement.setAttribute('estado', 'RESERVADO');
  //       }

  //       const estado: any = EstadoAssento[newState];

  //       this.assentoService.updateSeatState(this.usuarioId || '' ,assentoId, estado).subscribe({
  //         next: () => {
  //           console.log('Estado do assento atualizado com sucesso.');
  //           // this.regenerateSeatList(assentoId, estado);
  //           // console.lo)
  //           // this.findAllAssentoByPkTransporte()
  //         },
  //         error: (err) => {
  //           console.error('Erro ao atualizar o estado do assento:', err);
  //           // Adicione aqui a lógica para lidar com o erro, se necessário
  //         }
  //       });
  //     } else {
  //       console.error(`Assento não encontrado com o ID: ${assentoId}`);
  //     }
  //   } else {
  //     console.error(`ID do assento é nulo.`);
  //   }
  // }

  deleteReservaAssentoTemporario(assentoId: string){
    this.reservaTemporariaService.delete(assentoId).subscribe({
              
      next:() =>{
        console.log("Deletado com sucesso" + assentoId)
      },
      error: (err) =>{
        console.log(JSON.stringify(err))
      }
    })
  }



  toggleSeatState(assentoId: string): void {
    if (assentoId) {
      const usuarioLogadoId = localStorage.getItem('pkUsuario');
      const assentoElement = document.querySelector(`[id-assento="${assentoId}"]`) as HTMLElement;

      if (assentoElement) {
        const isReservedByCurrentUser = this.usuarioId === assentoElement.getAttribute('usuario-id');

        let newState: EstadoAssento;
        if(assentoElement.classList.contains("inativo")){
          alert("Essa assento ja foi ocupado")
          return;
        }

        if (assentoElement.classList.contains("reserved")) {
          if (isReservedByCurrentUser) {
            newState = EstadoAssento.DISPONIVEL;
            
            assentoElement.classList.remove("reserved");
            assentoElement.classList.add("available");
            //logica para apagar areservaTemp na BD
            
            this.removeFromAuxAssentoList(assentoId);
            
            this.cont--;
            
            this.total = this.preco * this.cont;
            
            assentoElement.setAttribute('estado', 'DISPONIVEL');
            
            assentoElement.removeAttribute('usuario-id');

            this.deleteReservaAssentoTemporario(assentoId)
           
          } else {
            newState = EstadoAssento.RESERVADO;
            alert("Assento reservado por outro usuário");
            return;
            // this.deleteReservaAssentoTemporario(assentoId)
          }
          // Se o assento estiver reservado pelo usuário logado, permitimos que ele mude para disponível

        } else {
          // Se o assento estiver disponível, permitimos que o usuário logado o reserve
          newState = EstadoAssento.RESERVADO;
          assentoElement.classList.remove("available");
          assentoElement.classList.add("reserved");
          const assento = this.assentoList.find(assento => assento.pkAssento === assentoId)
          if (assento) {
            this.auxAssentoList.push(assento);
            this.cont++;
            this.total = this.preco * this.cont;
          }
          assentoElement.setAttribute('estado', 'RESERVADO');
          assentoElement.setAttribute('usuario-id', this.usuarioId|| '');
          // assentoElement.setAttribute('usuario-id', usuarioLogadoId || '');
        }

        const estado: any = EstadoAssento[newState];

        this.assentoService.updateSeatState(this.usuarioId|| '',assentoId, estado).subscribe({
          next: () => {
            console.log('Estado do assento atualizado com sucesso.');
          },
          error: (err) => {
            console.error('Erro ao atualizar o estado do assento:', err);
            // Adicione aqui a lógica para lidar com o erro, se necessário
          }
        });
      } else {
        console.error(`Assento não encontrado com o ID: ${assentoId}`);
      }
    } else {
      console.error(`ID do assento é nulo.`);
    }
  }


  removeFromAuxAssentoList(assentoId: string): void {
    const index = this.auxAssentoList.findIndex(assento => assento.pkAssento === assentoId);
    if (index !== -1) {
      this.auxAssentoList.splice(index, 1);
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--
        this.formatTime();
      }
      else {
        this.stopTimer();

        // alert("O tempo expirou!");
        this.isDialogOpenTimer = true;
        this.isDialogOpenAssento = false;
        this.auxAssentoList.splice(0);
        //redirecionar para mesma pagina quando ele clicar na modal

      }

    }, 1000) //Actualiza em cada segundo
  }

  stopTimer() {
    clearInterval(this.interval)
  }

  formatTime() {
    const minutes: number = Math.floor(this.timeLeft / 60);
    const seconds: number = this.timeLeft % 60;

    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

    this.formatedTime = `${formattedMinutes}:${formattedSeconds}`;
  }

  closeDialod() {
    this.isDialogOpenTimer = false;
    this.timeLeft = 300;
    this.startTimer();
    // this.formatTime();
  }
  pageProgramacao() {
    this.router.navigate(['/cliente/pesquisar-viagens']);
  }

  initPedidoDTO(){
    this.pedidoDTO.entidade = 'dddddd'
    console.log( this.pedidoDTO.entidade)
    this.pedidoDTO.pkProgramacao = this.idProgramacao // esta aqui o erro
    this.pedidoDTO.pkUser = this.usuarioId|| '';
    this.pedidoDTO.totalPago = this.total;
    this.pedidoDTO.assentosSelecionados = this.auxAssentoList
    console.log(this.pedidoDTO.assentosSelecionados)
    this.programacaoDataService.setAssentosSelecionados(this.pedidoDTO.assentosSelecionados);
    
  }
  efetuarPedidoPagamento(){
    if (!this.tipoPagamentoSelecionado) {
      alert('Selecione uma modalide de pagamento')
      // Exiba uma mensagem de erro ou tome outra ação, como abrir um modal, informando ao usuário que uma forma de pagamento deve ser selecionada.
      return;
  }

  if (this.auxAssentoList.length === 0) {
    alert('Selecione pelo menos um assento')
      // Exiba uma mensagem de erro ou tome outra ação, informando ao usuário que pelo menos um assento deve ser selecionado.
      return;
  }

    // //////////////////////////////
    this.initPedidoDTO();
    this.reservaService.create(this.pedidoDTO).subscribe({
      next:(res: Pedido) => {
        this.programacaoDataService.setPkPedido(res.pkPedido)
        console.log("Pedido feito com sucesso")
        const timeLeft = 300 - this.timeLeft;
        console.log("Meu tempo restante-> " + timeLeft)
        this.programacaoDataService.setTimer(timeLeft)
        this.router.navigate(['/cliente/pagamento', res.pkPedido])
      },
      error:(err) => {
        console.log(JSON.stringify(err));
      }
    })
    
    

  }

  atualizarNomeBotao() {
    if (this.tipoPagamentoSelecionado === 'REFERENCIA') {
      this.programacaoDataService.setTipoPagamento(this.tipoPagamentoSelecionado)
        
        this.nomeBotaoPagamento = 'Pagar com Referência';
    } else if (this.tipoPagamentoSelecionado === 'TRANSFERENCIABANCARIA') {
      this.programacaoDataService.setTipoPagamento(this.tipoPagamentoSelecionado)
      
        this.nomeBotaoPagamento = 'Pagar por Transferência Bancária';
    } else {
        this.nomeBotaoPagamento = 'Pagamento';
    }
}

voltar(): void {
  this.location.back();
}

}
