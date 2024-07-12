import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  mostrarConsulta = false;
  identificationNumber: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showConsulta(): void {
    this.mostrarConsulta = true;
  }

  navigateToReservas(): void {
    this.router.navigate(['/reservas']);
  }

  consultarReservas(): void {
    if (this.identificationNumber) {
      this.router.navigate(['/consultar', this.identificationNumber]);
    } else {
      alert('Por favor ingrese el número de identificación.');
    }
  }
}
