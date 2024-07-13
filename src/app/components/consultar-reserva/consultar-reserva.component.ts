import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
}
