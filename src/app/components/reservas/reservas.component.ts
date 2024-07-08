import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  reservaData: any;
  vueloId: number | null = null;
  hotelId: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  handleFormSubmit(data: any): void {
    this.reservaData = data;
    this.checkAllData();
  }

  handleVueloSelected(vueloId: number): void {
    this.vueloId = vueloId;
    this.checkAllData();
  }

  handleHotelSelected(hotelId: number): void {
    this.hotelId = hotelId;
    this.checkAllData();
  }

  checkAllData(): void {
    if (this.reservaData && this.vueloId && this.hotelId) {
      const postData = {
        ...this.reservaData,
        vueloId: this.vueloId,
        hotelId: this.hotelId
      };

      this.http.post('TU_URL_API', postData).subscribe(response => {
        console.log('Reserva realizada con éxito:', response);
      }, error => {
        console.log('Error al realizar la reserva:', error);
      });
    }
  }

}
