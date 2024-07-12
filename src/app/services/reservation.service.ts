import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlHotel: string = 'http://127.0.0.1:37771/';
  urlVuelo: string = 'http://127.0.0.1:41229/';
  urlReservas: string = 'url/';


  constructor(private http: HttpClient) { }

  getHoteles(): Observable<any> {
    const url = `${this.urlHotel}hotel/`;
    return this.http.get(url);
  }

  getVuelos() {
    const url = `${this.urlVuelo}flight/`;
    return this.http.get(url);
  }

  getAerolineas(){
    const url = `${this.urlVuelo}airline/`;
    return this.http.get(url);
  }

  postReservation(data: any): Observable<any> {
    const url = `${this.urlVuelo}reservation/add`;
    return this.http.post(url, data);
  }
}
