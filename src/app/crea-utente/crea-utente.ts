import { ChangeDetectorRef, Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Form } from '../form/form';
import { UtenteRequest } from '../model/UtenteRequest';
import { UtenteService } from '../service/utente/utente-service';
import { Location } from '@angular/common';
import { RuoliService } from '../service/ruoli/ruoli-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crea-utente',
  imports: [Form],
  templateUrl: './crea-utente.html',
  styleUrl: './crea-utente.css',
})
export class CreaUtente {

  newUtente?: UtenteRequest;
  listaRuoli!: String[];

  constructor(private utenteService: UtenteService, private router: Router,
    private ruoliService: RuoliService, private cdr: ChangeDetectorRef
  ) { }

  creaUtenteFormConfig = [
    { name: "nome", type: 'text', label: 'nome', cols: 4, validators: [Validators.required] },
    { name: "cognome", type: 'cognome', label: 'cognome', cols: 4, validators: [Validators.required] },
    { name: "email", type: 'email', label: 'email', cols: 4, validators: [Validators.required] },
    { name: "password", type: 'password', label: 'password', cols: 3, validators: [Validators.required] },
    { name: "telefono", type: 'number', label: 'telefono', cols: 3, validators: [Validators.required] },
    { name: "tipoUtente", type: 'select', label: 'tipoUtente', cols: 3, validators: [Validators.required] },
    { name: "idSede", type: "number", label: 'idSede', cols: 3, validators: [Validators.required] },
  ]

  ngOnInit() {
    this.ruoliService.getRuoliUtente().subscribe(ruoli => {
      this.listaRuoli = ruoli;
      this.cdr.detectChanges();
    })
  }
  onFormSubmit(formData: any) {
    this.newUtente = formData as UtenteRequest;
    this.newUtente.idSede = Number(this.newUtente.idSede);
    this.utenteService.creaUtente(this.newUtente).subscribe({
      next: () => {
        this.router.navigate(['/listaUtenti']);
      }
    });
    console.log(this.newUtente);

  }
}
