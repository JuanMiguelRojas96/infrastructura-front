import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { ConsultarReservaComponent } from './components/consultar-reserva/consultar-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VuelosComponent,
    HotelesComponent,
    ReservasComponent,
    InicioComponent,
    ConsultarReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
