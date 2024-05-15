import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rota } from '../modelos/rota.interface';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { RotaDTO } from '../modelos/rotaDTO.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RotaService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Rota[]>{
    return this.http.get<Rota[]>(endpoints.findAllRota);
  }

  getAllRotasWithTransporteAndPreco(): Observable<RotaDTO[]>{
    return this.http.get<RotaDTO[]>(endpoints.findAllRotawithPreco);
  }

  findPrecoByRotaAndTransporte(pkRota: string, pkTransporte: string): Observable<number>{
    console.log("\n rota: " + pkRota)
    console.log(pkTransporte)
   
    
    return this.http.get<number>(`${endpoints.findPrecoByRotaAndTransporte}/${pkRota}/${pkTransporte}`).pipe(
      tap({
        next: (preco: number) => {
          console.log("Preço retornado:", preco);
        },
        error: (error: any) => {
          console.error("Erro ao buscar preço:", error);
        }
      })
    );
    // return this.http.get<number>(`${endpoints.findPrecoByRotaAndTransporte}/${pkRota}/${pkTransporte}`)
  }

  findById(pkRota: string): Observable<Rota>{
    return this.http.get<Rota>(`${endpoints.findByIdRota}/${pkRota}`)
  }

  create(data: any): Observable<any>{
    console.log("estou dentro do formulario : " + data)
    return this.http.post<any>(endpoints.createRota, data);
  }

  update(data: any, pkRota: string): Observable<any>{
    return this.http.put<any>(`${endpoints.updateRota}/${pkRota}`, data);
  }

  delete(pkRota: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteRota}/${pkRota}`,{responseType:'text'})
  }

}
