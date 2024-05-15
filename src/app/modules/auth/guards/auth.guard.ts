import { HttpClient } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { ɵɵinject } from '@angular/core';


export const AuthGuard: CanActivateFn = (route, state) => {

const authService = ɵɵinject(AuthService)
  const router = new Router();
  console.log("Verifica: " + authService.isAuthenticated() )

  if (authService.isAuthenticated())
    return true;
  else{
    router.navigate(['/login']);
    return false;
  }
};
