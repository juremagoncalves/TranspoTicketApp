import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bilhete } from '../../dashboard/dashboard/modelos/bilhete.interface';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BilheteService {

  constructor(private http: HttpClient) { }

  getBilheteByPkPedido(pkPedido: any): Observable<Bilhete[]>{
    return this.http.get<Bilhete[]>(`${endpoints.getBilheteByPkPedido}bi/${pkPedido}`)  
  }

  getBileteByUserId(pkUser: string):Observable<Bilhete[]>{
    return this.http.get<Bilhete[]>(`${endpoints.getBilheteByUserId}/${pkUser}`)
  }


  // findALL(): Observable<ReservaTemporaria[]>{
  //   return this.http.get<ReservaTemporaria[]>(endpoints.findAllReservaAssentoTemporario)
  // }
}
