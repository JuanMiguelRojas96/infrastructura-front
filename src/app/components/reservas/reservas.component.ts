import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from 'src/app/services/reservation.service';
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  reservaData: any;
  id_flight: number | null = null;
  id_hotel: number | null = null;
  isModalOpen = false;
  isDataInformation: boolean = false;

  constructor(private http: HttpClient, private reservationService: ReservationService) { }

  ngOnInit(): void {
  }

  handleFormSubmit(data: any): void {
    this.reservaData = data;
    if (data.type === 'hotel') {
      this.promptHotelSelection();
    } else if (data.type === 'vuelo') {
      this.promptVueloSelection();
    } else if (data.type === 'ambos') {
      this.promptVueloSelection();
    }
  }

  promptHotelSelection(): void {
    this.isModalOpen = true;
  }

  promptVueloSelection(): void {
    // Aquí puedes abrir la selección de vuelo de alguna manera si es necesario
    // ya que no hay un modal definido para vuelos en tu código, asumimos que se muestra directamente.
  }

  handleDataInformation(status: boolean): void {
    this.isDataInformation = status;
  }

  handleVueloSelected(vueloId: number): void {
    this.id_flight = vueloId;
    if (this.reservaData.type === 'ambos') {
      this.promptHotelSelection();
    } else {
      this.sendReservationData();
    }
  }

  handleHotelSelected(hotelId: number): void {
    this.id_hotel = hotelId;
    this.sendReservationData();
  }

  sendReservationData(): void {
    const postData: any = {
      ...this.reservaData,
      id_hotel: this.reservaData.type === 'hotel' || this.reservaData.type === 'ambos' ? this.id_hotel : null,
      id_flight: this.reservaData.type === 'vuelo' || this.reservaData.type === 'ambos' ? this.id_flight : null
    };

    delete postData.type;

    this.reservationService.postReservation(postData).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Reserva realizada',
          text: `La reserva de ${this.reservaData.type} se ha realizado correctamente.`,
        }).then(() => {
          this.resetAll();
        });
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al realizar la reserva, por favor intente de nuevo.',
        });
      }
    );
  }

  resetAll(): void {
    this.reservaData = null;
    this.id_flight = null;
    this.id_hotel = null;
    this.isModalOpen = false;
    this.isDataInformation = false;

    if (this.headerComponent) {
      this.headerComponent.reservaForm.reset();
    }
  }

}
