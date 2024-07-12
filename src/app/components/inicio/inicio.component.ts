import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  mostrarConsulta = false;
  identificationNumber: string = '';

  constructor(private router: Router, private reservationService: ReservationService) { }

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
      this.reservationService.getReservas(this.identificationNumber).subscribe ((reservations: any) => {
        if (reservations.length  > 0) {
          this.router.navigate(['/consultar', this.identificationNumber]);
        }else{
          alert('Esta identificación no tiene reservas.');
        }
      });
    } else {
      alert('Por favor ingrese el número de identificación.');
    }
  }
}
