import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter<any>();
  @Output() dataInformation = new EventEmitter<boolean>();

  reservaForm: FormGroup = new FormGroup({});

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.reservaForm = this.formBuilder.group({
      name: ['', Validators.required],
      identification_number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      amount_people: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      Swal.fire({
        title: '¿Qué desea reservar?',
        input: 'select',
        inputOptions: {
          hotel: 'Solo Hotel',
          vuelo: 'Solo Vuelo',
          ambos: 'Hotel y Vuelo'
        },
        inputPlaceholder: 'Seleccione una opción',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve(null);
            } else {
              resolve('Debe seleccionar una opción');
            }
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleReservationType(result.value);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Llene todos los campos",
      });
    }
  }

  handleReservationType(type: string): void {
    const formData = this.reservaForm.value;

    if (type === 'hotel') {
      this.formSubmitted.emit({ ...formData, type: 'hotel' });
    } else if (type === 'vuelo') {
      this.formSubmitted.emit({ ...formData, type: 'vuelo' });
    } else if (type === 'ambos') {
      this.formSubmitted.emit({ ...formData, type: 'ambos' });
    }

    this.dataInformation.emit(true);
  }

}
