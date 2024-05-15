import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Programacao } from '../modelos/programacao.interface';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProgramacaoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Programacao[]>{
    return this.http.get<Programacao[]>(endpoints.findAllProgramacao);
  }

  findByPkRotaByDataViagem(pkRota: string, dataViagem: Date): Observable<Programacao[]>{
    return this.http.get<Programacao[]>(`${endpoints.findByPkRotaByDataViagem}/${pkRota}/${dataViagem}`);
  }

  findById(pkProgramacao: string): Observable<Programacao>{
    return this.http.get<Programacao>(`${endpoints.findByIdProgramacao}/${pkProgramacao}`)
  }

  create(data: any): Observable<any>{
    console.log("estou dentro do formulario : " + data)
    return this.http.post<any>(endpoints.createProgramacao, data);
  }

  update(data: any, pkProgramacao: string): Observable<any>{
    return this.http.put<any>(`${endpoints.updateProgramacao}/${pkProgramacao}`, data);
  }

  delete(pkProgramacao: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteProgramacao}/${pkProgramacao}`,{responseType:'text'})
  }

}

