import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter<any>();

  reservaForm: FormGroup = new FormGroup({});

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.reservaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      identificacion: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      cantidad: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.formSubmitted.emit(this.reservaForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

}
