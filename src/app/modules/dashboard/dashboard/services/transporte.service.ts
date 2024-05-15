import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { Transporte } from '../modelos/transporte.interface';
import { Assento } from '../modelos/assento.interface';
// import { Transporte } from '../modelos/transporte.interface';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transporte[]>{
    return this.http.get<Transporte[]>(endpoints.findAllTransporte);
  }
  
  getAllByPkClasseServico(pkClasseServico: string): Observable<Transporte[]>{
    return this.http.get<Transporte[]>(`${endpoints.findAllTransporteByPkClasseServico}/${pkClasseServico}`);
  }

  findById(pkTransporte: string): Observable<Transporte>{
    return this.http.get<Transporte>(`${endpoints.findByIdTransporte}/${pkTransporte}`)
  }

  create(data: any): Observable<any>{
    console.log("estou dentro do formulario")
    return this.http.post<any>(endpoints.createTransporte, data);
  }

  update(data: any, pkTransporte: string): Observable<any>{
    return this.http.put<any>(`${endpoints.updateTransporte}/${pkTransporte}`, data);
  }

  delete(pkTransporte: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteTransporte}/${pkTransporte}`,{responseType:'text'})

  }
}
