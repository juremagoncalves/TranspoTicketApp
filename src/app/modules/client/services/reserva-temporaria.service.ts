import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaTemporaria } from '../modelos/reserva_temporaria.interface';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ReservaTemporariaService {

  constructor(private http: HttpClient) { }

  findALL(): Observable<ReservaTemporaria[]>{
    return this.http.get<ReservaTemporaria[]>(endpoints.findAllReservaAssentoTemporario)
  }

  delete(pkAssento: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteReservaAssentoTemporario}${pkAssento}`)

  }
}
