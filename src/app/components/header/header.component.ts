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
      this.formSubmitted.emit(this.reservaForm.value);
      this.dataInformation.emit(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Llene todos los campos",
      });
    }
  }

}
