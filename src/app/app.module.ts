import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';

import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './shared/components/input/input.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegiterComponent } from './modules/auth/regiter/regiter.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { DashboardModule } from './modules/dashboard/dashboard/dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { ErrorMsgComponent } from './shared/components/error-msg/error-msg.component';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import { AuthService } from './modules/auth/services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './modules/auth/interceptor/jwt.interceptor';
import { ClientComponent } from './modules/client/client.component';
import { ClientModule } from './modules/client/client.module';
// import { MinhasReservasComponent } from './client/pages/minhas-reservas/minhas-reservas.component';
// import { DropdownComponent } from './shared/component/dropdown/dropdown.component';




@NgModule({
  declarations: [
    AppComponent,
    // InputComponent,
    // ButtonComponent,
    RegiterComponent,
    LoginComponent,
    ClientComponent,
    // MinhasReservasComponent,
    
   
    
   
   
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DashboardModule,
    ClientModule,
    FontAwesomeModule,
    ChartModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule
   
    
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
