import * as SockJS from 'sockjs-client';
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { RxStompService } from '@stomp/ng2-stompjs';
// import  SockJs from '';
import  * as Stomp from 'stompjs';



@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  private stompCliente: any;

  constructor(private rxStompService: RxStompService) { }

  connect(onMessageReceived: (message: any) => void) : void{
    console.log("entrei websockets 1")
    const serverUrl = 'http://localhost:8080/ws'
    const ws = new SockJS(serverUrl);
    console.log(ws)
    this.stompCliente = Stomp.over(ws);
    console.log("entrei websockets 2")
    console.log(this.stompCliente)
    this.stompCliente.connect( {}, () => {
      console.log("entrei websockets 3")
      console.log("Conectado ao websocket");
      this.stompCliente.subscribe('/topic/seatUpdate', (message: any) => {
        console.log("YEAH");
        onMessageReceived(JSON.parse(message.body))
        // console.log(typeof JSON.parse(message.body));
      })
    }, (error: any) => {
      console.error('Erro ao conectar ao WebSocket--------:', JSON.stringify(error));
    });

  }

  // connectPagamento()
  connectPagamento(onMessageReceived: (message: any) => void) : void{
    console.log("entrei websockets 1")
    const serverUrl = 'http://localhost:8080/ws'
    const ws = new SockJS(serverUrl);
    console.log(ws)
    this.stompCliente = Stomp.over(ws);
    console.log("entrei websockets 2")
    console.log(this.stompCliente)
    this.stompCliente.connect( {}, () => {
      console.log("entrei websockets 3")
      console.log("Conectado ao websocket");
      this.stompCliente.subscribe('/topic/pagamento', (message: any) => {
        console.log("YEAH");
        onMessageReceived(JSON.parse(message.body))
        // console.log(typeof JSON.parse(message.body));
      })
    }, (error: any) => {
      console.error('Erro ao conectar ao WebSocket--------:', JSON.stringify(error));
    });

  }


  disconnect(): void{
    if(this.stompCliente){
      this.stompCliente.disconnect();
      console.log("Desconectado do websockets")
    }
  }

  // connect(onMessageReceived: (message: any) => void): void {
  //   this.rxStompService.watch('/topic/seatUpdate').subscribe((message) => {
  //     onMessageReceived(message.body);
  //   });
  // }

  // disconnect(): void {
  //   this.rxStompService.deactivate();
  // }
}
