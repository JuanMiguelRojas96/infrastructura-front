import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {

  vuelos : any[] = [];
  aerolineas : any[] = [];
  @Output() vueloSelected = new EventEmitter<number>();
  @Input() isDataInformation: boolean = false;

  // vuelos: any[] = [
  //   { id: 1,
  //     idAirline: 1,
  //     origin: "Bogotá",
  //     destination: "Medellín",
  //     seats: 150,
  //     price: 200,
  //     reservation: 120,
  //     full: false
  //   },
  //   { id: 2,
  //     idAirline: 2,
  //     origin: "Lima",
  //     destination: "Santiago",
  //     seats: 150,
  //     price: 250,
  //     reservation: 120,
  //     full: false
  //   },
  //   { id: 3,
  //     idAirline: 3,
  //     origin: "Ciudad de Panamá",
  //     destination: "Miami",
  //     seats: 150,
  //     price: 300,
  //     reservation: 120,
  //     full: false
  //   }
  // ];

  // aerolineas: any[] = [
  //   { id: 1,
  //     nit: "123456789",
  //     name: "Avianca",
  //     phone: "123456789",
  //     fleetSize: 150,
  //   },
  //   { id: 2,
  //     nit: "123456789",
  //     name: "Latam",
  //     phone: "123456789",
  //     fleetSize: 150,
  //   },
  //   { id: 3,
  //     nit: "123456789",
  //     name: "Interjet",
  //     phone: "123456789",
  //     fleetSize: 150,
  //   }
  // ]

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getVuelos();
    this.getAerolineas();
  }

  openModal(vueloId: number): void {
    this.vueloSelected.emit(vueloId);
  }

  getAerolineas(): void {
    this.reservationService.getAerolineas().subscribe((data: any) => {
      this.aerolineas = data;
    });
  }

  getVuelos(): void {
    this.reservationService.getVuelos().subscribe((data: any) => {
      this.vuelos = data;
      
    });
  }

  setAerolinea(idAirline: number): any {
    const aerolinea = this.aerolineas.find(a => a.id === idAirline);
    return aerolinea ? aerolinea.name : undefined;
  }
}
