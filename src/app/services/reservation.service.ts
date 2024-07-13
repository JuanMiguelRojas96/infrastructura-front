import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlHotel: string = 'http://127.0.0.1:8092/';
  urlVuelo: string = 'http://127.0.0.1:8090/';
  urlReservas: string = 'http://127.0.0.1:8091/';


  constructor(private http: HttpClient) { }

  getHoteles(): Observable<any> {
    const url = `${this.urlHotel}hotel/`;
    return this.http.get(url);
  }

  getHotel(id: number): Observable<any> {
    const url = `${this.urlHotel}reservation/nameHotel/${id}`;
    return this.http.get(url);
  }

  getVuelo(id: number): Observable<any> {
    const url = `${this.urlVuelo}reservation/nameFlight/${id}`;
    return this.http.get(url);
  }

  getVuelos() {
    const url = `${this.urlVuelo}flight/`;
    return this.http.get(url);
  }

  getReservas(id: any) {
    const url = `${this.urlReservas}reservation/${id}`;
    return this.http.get(url);
  }

  getAerolineas(){
    const url = `${this.urlVuelo}airline/`;
    return this.http.get(url);
  }

  postReservation(data: any): Observable<any> {
    const url = `${this.urlReservas}reservation/add`;
    return this.http.post(url, data);
  }

  cancelarReserva(reservaId: any): Observable<any> {
    const url = `${this.urlReservas}reservation/delete/${reservaId}`;
    return this.http.patch(url, {});
  }
}
