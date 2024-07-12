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
  vuelo: any = {};

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
      console.log(this.reservations);
    })
  }

  getHotelName(id: number): any {
    this.reservationService.getHotel(id).subscribe((hotels: any) => {
      return hotels.name
    })
  }

  getFlightDetails(id: number): void {
    this.reservationService.getVuelo(id).subscribe((flight: any) => {
      this.vuelo = flight
    })
  }
}
