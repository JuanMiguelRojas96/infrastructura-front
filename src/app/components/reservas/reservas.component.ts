import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  reservaData: any;
  id_flight: number | null = null;
  id_hotel: number | null = null;
  isModalOpen = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleFormSubmit(data: any): void {
    this.reservaData = data;
    this.checkAllData();
  }

  handleVueloSelected(vueloId: number): void {
    this.id_flight = vueloId;
    this.isModalOpen = true;
    this.checkAllData();
  }

  handleHotelSelected(hotelId: number): void {
    this.id_hotel = hotelId;
    this.isModalOpen = false;
    this.checkAllData();
  }

  checkAllData(): void {
    if (this.reservaData && this.id_flight && this.id_hotel) {
      const postData = {
        ...this.reservaData,
        id_flight: this.id_flight,
        id_hotel: this.id_hotel
      };
      console.log(postData);


      this.http.post('TU_URL_API', postData).subscribe(response => {
        console.log('Reserva realizada con éxito:', response);
      }, error => {
        console.log('Error al realizar la reserva:', error);
      });
    }
  }

}
