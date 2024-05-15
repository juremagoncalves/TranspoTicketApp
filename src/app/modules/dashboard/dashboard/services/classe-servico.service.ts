import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/endpoints/endpoints';
import { ClasseServico } from '../modelos/classe-servico.interface';

@Injectable({
  providedIn: 'root'
})
export class ClasseServicoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClasseServico[]>{
    return this.http.get<ClasseServico[]>(endpoints.findAllClasseServico);
  }

  findById(pkClasseServico: string): Observable<ClasseServico>{
    return this.http.get<ClasseServico>(`${endpoints.findByIdClasseServico}/${pkClasseServico}`)
  }

  create(data: any): Observable<any>{
    return this.http.post<any>(endpoints.createClasseServico, data);
  }

  update(data: any, pkClasseServico: string): Observable<any>{
    return this.http.put<any>(`${endpoints.updateClasseServico}/${pkClasseServico}`, data);
  }

  delete(pkClasseServico: string): Observable<any>{
    return this.http.delete(`${endpoints.deleteClasseServico}/${pkClasseServico}`,{responseType:'text'})

  }

  // delete(pkMarca: string): Observable<any>{
  //   return this.httpClient.delete(`${this.urlMarcaDelete}/${pkMarca}`, {responseType:'text'})
  // }

  
}
