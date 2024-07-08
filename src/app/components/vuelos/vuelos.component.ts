import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  @Output() vueloSelected = new EventEmitter<number>();
  isModalOpen = false;

  vuelos: any[] = [
    { id: 1,
      idAirline: 1,
      origin: "Bogotá",
      destination: "Medellín",
      seats: 150,
      price: 200,
      reservation: 120,
      full: false
    },
    { id: 2,
      idAirline: 2,
      origin: "Lima",
      destination: "Santiago",
      seats: 150,
      price: 250,
      reservation: 120,
      full: false
    },
    { id: 3,
      idAirline: 3,
      origin: "Ciudad de Panamá",
      destination: "Miami",
      seats: 150,
      price: 300,
      reservation: 120,
      full: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openModal(vueloId: number): void {
    this.vueloSelected.emit(vueloId);
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
