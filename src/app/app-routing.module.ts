import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservasComponent } from './components/reservas/reservas.component';

const routes: Routes = [
  { path: '', redirectTo: '/reservas', pathMatch: 'full' },
  { path: 'reservas', component: ReservasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
