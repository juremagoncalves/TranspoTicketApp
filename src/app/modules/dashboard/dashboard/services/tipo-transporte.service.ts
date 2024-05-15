import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoints/endpoints';
import { TipoTransporte } from '../modelos/tipo-transporte.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTransporteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TipoTransporte[]>{
    return this.http.get<TipoTransporte[]>(endpoints.findAllTipoTransporte);
  }

  findById(pkTipoTransporte: string): Observable<TipoTransporte>{
    return this.http.get<TipoTransporte>(`${endpoints.findByIdTipoTransporte}/${pkTipoTransporte}`)
  }

  create(data: any): Observable<any>{
    return this.http.post<any>(endpoints.createTipoTransporte, data);
  }

  update(data: any, pkTipoTransporte: string): Observable<any>{
    return this.http.put<any>(`${endpoints.updateTipoTransporte}/${pkTipoTransporte}`, data);
  }

  delete(pkTipoTransporte: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteTipoTransporte}/${pkTipoTransporte}`,{responseType:'text'})

  }
}
