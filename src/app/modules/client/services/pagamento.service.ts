import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagamentoDTO } from '../../dashboard/dashboard/modelos/pagamentoDTO.interface';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  constructor(private http: HttpClient) { }

  createPagamento(data: PagamentoDTO): Observable<any>{
    return this.http.post(endpoints.createPagamento, data)
  }
}
