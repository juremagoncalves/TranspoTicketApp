import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = new Router();
  console.log("es admin: " + authService.isAdmin())

  if (!authService.isAuthenticated() || !authService.isAdmin()) {
    //  router.navigate(['/login']);
    inject(Router).navigate(['/login']);
    return false;

  }
  return true;
};
