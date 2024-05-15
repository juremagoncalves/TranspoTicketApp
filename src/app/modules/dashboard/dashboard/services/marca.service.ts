import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../modelos/marca.interface';
import { environment } from 'src/environments/environment.development';
import { endpoints } from 'src/app/endpoints/endpoints';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class MarcaService {

  constructor(private httpClient : HttpClient) { }
  u = environment.apiUrl

  baseUrl = 'http://localhost:8080/marca';

  urlMarca = 'http://localhost:8080/marca/';
  
  urlMarcaDelete = 'http://localhost:8080/marca';

  urlFindById = 'http://localhost:8080/marca/findById';

  urlUpdate = 'http://localhost:8080/marca/update'

  getAll():Observable<Marca[]> {
    // console.log("entrei" + this.httpClient.get<Marca[]>(baseUrl))
    return this.httpClient.get<Marca[]>(this.baseUrl);
  }

  findById(pkMarca: string): Observable<Marca>{
    console.log("Teste:\n " + pkMarca)
    return this.httpClient.get<Marca>(`${this.urlFindById}/${pkMarca}`)

  }

  create(data: any): Observable<any>{
    console.log("Dados do usuario: " + JSON.stringify(data))
    console.log(endpoints.updateClasseServico)
    return this.httpClient.post<any>(this.urlMarca, data)
  }

  update(pkMarca: string, data: any): Observable<any>{
    console.log("Dados do usuario: " + JSON.stringify(data) + "Chave" + pkMarca)
    return this.httpClient.put(`${this.urlUpdate}/${pkMarca}`, data)
  }

  delete(pkMarca: string): Observable<any>{
    return this.httpClient.delete(`${this.urlMarcaDelete}/${pkMarca}`, {responseType:'text'})
  }

}
