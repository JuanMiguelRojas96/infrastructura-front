import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.scss']
})
export class ConsultarReservaComponent implements OnInit {

  identificationNumber: string | null = null;
  reservations: any[] = [];
  hoteles: any = {};
  vuelos: any = {};

  constructor(private route: ActivatedRoute, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.route.paramMap.subscribe(params => {
      this.identificationNumber = params.get('id');
      this.loadReservations(this.identificationNumber);
    });
  }

  loadReservations(id: string | null): void {
    this.reservationService.getReservas(id).subscribe((reservations: any) => {
      this.reservations = reservations;
      this.loadHotelsAndFlights();
    })
  }

  loadHotelsAndFlights(): void {
    const hotelIds = [...new Set(this.reservations.map(r => r.idReservationHotel).filter(id => id))];
    const flightIds = [...new Set(this.reservations.map(r => r.idReservationFlight).filter(id => id))];

    hotelIds.forEach(id => {
      this.reservationService.getHotel(id).subscribe((hotel: any) => {
        this.hoteles[id] = hotel.name;
      });
    });

    flightIds.forEach(id => {
      this.reservationService.getVuelo(id).subscribe((flight: any) => {
        this.vuelos[id] = `${flight.origin} a ${flight.destination}`;
      });
    });
  }

  getHotelName(id: number): string {
    return this.hoteles[id] || 'N/A';
  }

  getFlightDetails(id: number): string {
    return this.vuelos[id] || 'N/A';
  }


  abrirModalCancelar(reservaId: number): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción cancelará la reserva seleccionada.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar reserva',
      cancelButtonText: 'No, mantener reserva'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cancelarReserva(reservaId);
      }
    });
  }

  cancelarReserva(reservaId: number): void {
    this.reservationService.cancelarReserva(reservaId).subscribe({
      next: () => {
        Swal.fire('Cancelada', 'La reserva ha sido cancelada exitosamente.', 'success');
        this.getReservations();
      },
      error: (error: any) => {
        Swal.fire('Error', 'Ocurrió un error al cancelar la reserva.', error.message);
      }
    });
  }
}
