import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { PrecoViagem } from '../modelos/precoViagem.interface';

@Injectable({
  providedIn: 'root'
})
export class PrecoViagemService {

  constructor(private http: HttpClient) { }
  
  create(data: any): Observable<any>{
    return this.http.post(endpoints.createPrecoViagem, data)
  }

  // delete(pkPreco: string): Observable<any>{
  //   return this.httpClient.delete(`${this.urlMarcaDelete}/${pkPreco}`, {responseType:'text'})
  // }

  update(data: any, pkPrecoViagem: string): Observable<any>{
    return this.http.put(`${endpoints.updatePrecoViagem}/${pkPrecoViagem}`, data)
  }

  getAll(): Observable<PrecoViagem[]>{
    return this.http.get<PrecoViagem[]>(endpoints.findAllPrecoViagem)
  }
}
