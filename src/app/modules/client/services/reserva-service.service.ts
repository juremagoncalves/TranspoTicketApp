import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { PedidoDTO } from '../../dashboard/dashboard/modelos/pedidoDTO.interface';
import { Pedido } from '../../dashboard/dashboard/modelos/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {

  constructor(private http: HttpClient) { }

  create(data: PedidoDTO): Observable<any>{
    return this.http.post(`${endpoints.createPedido}`, data)
  }

  getPedidoById(pkPedido: string): Observable<Pedido>{
    return this.http.get<Pedido>(`${endpoints.getPedidoById}/${pkPedido}`)
  }

  getDataExpiracao(idPedido: string): Observable<Date> {
    return this.http.get<Date>(`${endpoints.getDataExpiracao}${idPedido}/data-expiracao`);
  }
  
}
