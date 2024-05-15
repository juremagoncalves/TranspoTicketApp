import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { MarcaComponent } from "./pages/marca/marca.component";
import { ClasseServicoComponent } from "./pages/classe-servico/classe-servico.component";
import { MainComponent } from "./components/main/main.component";
import { DashboardComponent } from "./dashboard.component";
import { TipoTransporteComponent } from "./pages/tipo-transporte/tipo-transporte.component";
import { TransporteComponent } from "./pages/transporte/transporte.component";
import { ProvinciaComponent } from "./pages/provincia/provincia.component";
import { RotaComponent } from "./pages/rota/rota.component";
import { ProgramacaoComponent } from "./pages/programacao/programacao.component";
import { PrecoViagemComponent } from "./pages/preco-viagem/preco-viagem.component";


const routes: Routes = [
    // { path: 'home', component: MainComponent },
    // { path: 'marca', component: MarcaComponent} ,
    // { path: 'classe-servico', component: ClasseServicoComponent },
    // { path: '', redirectTo: '/home', pathMatch: 'full' }
    { path: '', component: DashboardComponent, children:[
        { path: 'home', component: MainComponent },
        { path: 'marca', component: MarcaComponent} ,
        { path: 'classe-servico', component: ClasseServicoComponent },
        { path: 'tipo-transporte' , component: TipoTransporteComponent},
        { path: 'transporte', component: TransporteComponent},
        { path: 'provincia', component: ProvinciaComponent },
        { path: 'rota', component: RotaComponent },
        { path: 'preco-viagem', component: PrecoViagemComponent },

        { path: 'programacao', component: ProgramacaoComponent }
    ] },
    // { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule{}