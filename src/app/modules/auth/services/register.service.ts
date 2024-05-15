import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private urlRegister = "http://localhost:8080/auth/register";

  constructor(private http:HttpClient) { }

  create(data: any): Observable<any>{
    return this.http.post<any>(this.urlRegister, data)
  }

}
