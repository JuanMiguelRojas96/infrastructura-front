import { Component, EventEmitter, Output } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent{

  hoteles: any[] = []

  // hoteles: any[] = [
  //   { id: 1,
  //     name: "Hilton",
  //     price: 200,
  //   },
  //   { id: 2,
  //     name: "Interconsult",
  //     price: 250,
  //   },
  //   { id: 3,
  //     name: "Dann Carlton",
  //     price: 300,
  //   }
  // ];

  @Output() close = new EventEmitter<void>();
  @Output() hotelSelected = new EventEmitter<number>();

  constructor(private reservationService: ReservationService) { }
  closeModal(): void {
    this.close.emit();
  }

  selectHotel(hotelId: number): void {
    this.hotelSelected.emit(hotelId);
  }

  getHoteles(): void {
    this.reservationService.getHoteles().subscribe(hoteles => {
      this.hoteles = hoteles;
    });
  }
}
