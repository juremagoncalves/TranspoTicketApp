import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assento } from '../modelos/assento.interface';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { EstadoAssento } from '../modelos/estadoAssento';

@Injectable({
  providedIn: 'root'
})
export class AssentoService {

  constructor(private http: HttpClient) { }

  findAssentoBypkTransporte(pkTransporte: string): Observable<Assento[]>{
    return this.http.get<Assento[]>(`${endpoints.findAssentoByPkTransporte}/${pkTransporte}`);
  }

  findAssentoByPkPedido(pkPedido: string): Observable<Assento[]>{
    return this.http.get<Assento[]>(`${endpoints.getAssentoByPkPedido}/${pkPedido}`)
  }

  // updateSeatState(pkAssento: string, estado: EstadoAssento): Observable<any> {
  //   const body = { estado: estado };
  //   return this.http.put(`${endpoints.updateSeatState}/${pkAssento}`, body);
  // }
  
  updateSeatState(pkUser: String, pkAssento: string, estado: EstadoAssento): Observable<any>{
    const body = { estado: estado };
    return this.http.put(`${endpoints.updateSeatState}/${pkUser}/${pkAssento}/${estado}`, body)
  }

  // updateSeatStatea(seatId: string, newState: EstadoAssento): Observable<any> {
  //   const url = `${this.apiUrl}/${seatId}/${newState}`; // Construa a URL com os parâmetros necessários
  //   return this.http.put(url, null); // Faça a requisição PUT, o corpo da requisição é nulo porque os parâmetros estão na URL
  // }
}
