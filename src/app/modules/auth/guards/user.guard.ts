import { CanActivateFn, Router } from '@angular/router';
import { ɵɵinject , inject} from '@angular/core';
import { AuthService } from './../services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  console.log("Sou user: " + authService.isUser())

  if (!authService.isAuthenticated() || !authService.isUser()) {

    inject(Router).navigate(['/login']);
    return false;
  }
  
  return true;
  
};


