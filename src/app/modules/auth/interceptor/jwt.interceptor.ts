import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private  authService: AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let currentUser:any = this.authService.getToken();
        console.log("JwtInterceptor.currentUser: " + currentUser)

        const url: string = request.url;
        if (url.includes('/register')) {
            console.log("entrei: " +  url.includes('/register'))
            return next.handle(request);
        }
        else{
            if(currentUser !== null){
                const authResquest = request.clone({
                    setHeaders: {Authorization: `Bearer ${currentUser}`}
                });
                return next.handle(authResquest);
            }
        }
        return next.handle(request);
    }
}