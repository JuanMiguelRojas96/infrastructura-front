import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './components/reservas/reservas.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ConsultarReservaComponent } from './components/consultar-reserva/consultar-reserva.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'consultar/:id', component: ConsultarReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
