import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jwt-decode';
import * as jwt_decode from 'jwt-decode';

import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { User } from '../modelos/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = 'http://localhost:8080/auth/login';
  logoutUrl = 'http://localhost:8080/auth/logout';
  public userNome: string = '';
  public userEmail: string = '';
  

  constructor(private http: HttpClient){}
  

  isAuthenticated(): boolean{
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean{
    const token = this.getToken();
    if(token){
      const decodedToken: any = jwt_decode.jwtDecode(token);
      console.log("Decodificando token" + JSON.stringify(decodedToken)  )
      const isAdmin = decodedToken.roles.includes("ROLE_ADMIN");
      console.log("O usuário é admin: " + isAdmin);
        
      return isAdmin;

    }
    return false;

  }

  isUser(): boolean{
    const token = this.getToken();
    if(token){
      const decodedToken: any = jwt_decode.jwtDecode(token);
      console.log("Decodificando token" + JSON.stringify(decodedToken)  )
      const isUser = decodedToken.roles.includes("ROLE_USER");
      console.log("O usuário é cliente: " + isUser);
      return isUser;

    }
    return false;

  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }, { responseType: 'json' }).pipe(
      map(user => {
        // const { nome } = user.person;
        const token = user.token
        const decodedToken: any = jwt_decode.jwtDecode(token);

         // Armazenando no localStorage
        const pkUsuario = decodedToken.pkUsuario
        const userEmail = decodedToken.sub;
        const userNome = decodedToken.nome;
        localStorage.setItem('pkUsuario', pkUsuario)
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userNome', userNome);
        // this.userEmail = decodedToken.sub;
        
        // this.userNome = decodedToken.nome;
        console.log(" VERIFICA"+ this.userNome)
        this.setTokenLocalStorage(user);
        return user;
      }),
      catchError(err => {
        this.removerTokenLocalStorage();
        throw 'Falha ao efetuar login.';
      })
    );
  }

  // login(email: string, password: string){
    
  //   return this.http.post<any>(this.loginUrl,{ email, password }, {responseType:'json'})
  //     .pipe(map(user => {
  //       this.setTokenLocalStorage(user)
  //       return user;
  //       catchError((err) =>{
  //         this.removerTokenLocalStorage();
  //         throw 'Falha ao efetuar login.'

  //       })
        
  //     }))
  //  }

  public getUserNome(){
    return localStorage.getItem('userNome');
  }

  public getUserEmaill(){
    return localStorage.getItem('userEmail');
  }

  public getPkUsuario(){
    return localStorage.getItem('pkUsuario');
  }

  private setTokenLocalStorage(res:any):void{
    const {type, token, _} = res;
    localStorage.setItem('token' , token)
   }

  private removerTokenLocalStorage():void{
    localStorage.removeItem('token');
   }

  public getToken():string | null{
    return localStorage.getItem('token');
   }

  
  logout(): void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
    const token = this.getToken();
    localStorage.removeItem('token');
    localStorage.removeItem('username')
    // this.currentUserSubject.next(null);

    if (token){
      this.http.post<any>(this.logoutUrl, {}, {
        headers: {'Authorization': `Bearer ${token}`}
      })
    }
   }

  setUserName(username:string){
    localStorage.setItem('username', JSON.stringify(username));
   }

  getUserName(){

    return JSON.parse(localStorage.getItem('username') || '{}');
}


}
