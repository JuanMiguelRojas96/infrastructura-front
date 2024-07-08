import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  urlBase: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getHoteles(): Observable<any> {
    const url = `${this.urlBase}hotel/`;
    return this.http.get(url);
  }

  getVuelos() {
    const url = `${this.urlBase}flight/`;
    return this.http.get(url);
  }

  getAerolineas(){
    const url = `${this.urlBase}airline/`;
    return this.http.get(url);
  }

}
