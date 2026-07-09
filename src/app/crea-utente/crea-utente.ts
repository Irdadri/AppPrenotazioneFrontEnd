import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Form } from '../form/form';
import { UtenteRequest } from '../model/UtenteRequest';
import { UtenteService } from '../service/utente/utente-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crea-utente',
  imports: [Form],
  templateUrl: './crea-utente.html',
  styleUrl: './crea-utente.css',
})
export class CreaUtente {

  newUtente?: UtenteRequest;

  constructor(private utenteService: UtenteService, private location: Location) { }

  creaUtenteFormConfig = [
    { name: "nome", type: 'text', label: 'nome', cols: 4, validators: [Validators.required] },
    { name: "cognome", type: 'cognome', label: 'datainizio',cols: 4, validators: [Validators.required] },
    { name: "email", type: 'email', label: 'email', cols: 4,validators: [Validators.required] },
    { name: "password", type: 'password', label: 'password',cols: 3, validators: [Validators.required] },
    { name: "telefono", type: 'number', label: 'number',cols: 3, validators: [Validators.required] },
    { name: "tipoUtente", type: 'text', label: 'tipoUtente', cols: 3, validators: [Validators.required] },
    { name: "idSede", type: 'text', label: 'idSede', cols: 3, validators: [Validators.required] },
  ]

  onFormSubmit(formData: any) {
    this.newUtente = formData as UtenteRequest;
    this.utenteService.creaUtente(this.newUtente);
    this.location.back();

  }
}
