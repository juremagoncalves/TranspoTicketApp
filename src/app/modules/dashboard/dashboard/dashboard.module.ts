import { ErrorMsgComponent } from './../../../shared/components/error-msg/error-msg.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';


import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MainComponent } from './components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopWidgetsComponent } from './components/top-widgets/top-widgets.component';
import { SalesByMonthComponent } from './components/sales-by-month/sales-by-month.component';
import { HomeComponent } from './pages/home/home.component';
import { MarcaComponent } from './pages/marca/marca.component';
import { ClasseServicoComponent } from './pages/classe-servico/classe-servico.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ConfirmationService } from 'primeng/api';
import { TipoTransporteComponent } from './pages/tipo-transporte/tipo-transporte.component';
import { TransporteComponent } from './pages/transporte/transporte.component';
import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';
import { ProvinciaComponent } from './pages/provincia/provincia.component';
import { RotaComponent } from './pages/rota/rota.component';
import { ProgramacaoComponent } from './pages/programacao/programacao.component';
import { PrecoViagemComponent } from './pages/preco-viagem/preco-viagem.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    TopWidgetsComponent,
    SalesByMonthComponent,
    HomeComponent,
    MarcaComponent,
    ClasseServicoComponent,
    PageTitleComponent,
    InputComponent,
    ButtonComponent,
    TableComponent,
    ErrorMsgComponent,
    DialogComponent,
    TipoTransporteComponent,
    TransporteComponent,
    DropdownComponent,
    ProvinciaComponent,
    RotaComponent,
    ProgramacaoComponent,
    PrecoViagemComponent
    
   
  ],
  
  
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashboardRoutingModule,
    HighchartsChartModule,
    FormsModule,
    // BrowserAnimationsModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    FileUploadModule,
    CalendarModule,
    PaginatorModule
    
    
  ],

  exports: [
    DashboardComponent,
    InputComponent,
    ButtonComponent,
    ErrorMsgComponent,
    DialogComponent,
    DropdownComponent,
    TableComponent
  ],
  
  providers: [ConfirmationService],
})
export class DashboardModule { }
