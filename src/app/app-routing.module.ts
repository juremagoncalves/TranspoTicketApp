import { DashboardModule } from './modules/dashboard/dashboard/dashboard.module';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegiterComponent } from './modules/auth/regiter/regiter.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { adminGuard } from './modules/auth/guards/admin.guard';
import { userGuard } from './modules/auth/guards/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegiterComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard, adminGuard], data: { requiredRoles: ['ROLE_ADMIN'] } 
  },

  {
    path: 'cliente', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule), 
    canActivate: [AuthGuard, userGuard], data: {requiredRoles: ['ROLE_USER'] }
  },
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
