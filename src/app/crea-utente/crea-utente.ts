import { ChangeDetectorRef, Component, Signal, signal } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Form } from '../form/form';
import { UtenteRequest } from '../model/UtenteRequest';
import { UtenteService } from '../service/utente/utente-service';
import { Location } from '@angular/common';
import { RuoliService } from '../service/ruoli/ruoli-service';
import { Router } from '@angular/router';
import { FormDefinitions } from '../model/FormDefinition';

@Component({
  selector: 'app-crea-utente',
  imports: [Form],
  templateUrl: './crea-utente.html',
  styleUrl: './crea-utente.css',
})
export class CreaUtente {

  newUtente?: UtenteRequest;
  listaRuoli = signal<String[]>([]);
  //duplicateKey = signal<boolean>(false);

  creaUtenteFormConfig = signal<FormDefinitions<any>[]>([
    { name: "nome", type: 'text', label: 'nome', cols: 4, validators: [Validators.required] },
    { name: "cognome", type: 'cognome', label: 'cognome', cols: 4, validators: [Validators.required] },
    { name: "email", type: 'email', label: 'email', cols: 4, validators: [Validators.required] },
    { name: "password", type: 'password', label: 'password', cols: 3, validators: [Validators.required] },
    { name: "telefono", type: 'number', label: 'telefono', cols: 3, validators: [Validators.required] },
    { name: "tipoUtente", type: 'select', label: 'tipoUtente', cols: 3, validators: [Validators.required] },
    { name: "idSede", type: "number", label: 'idSede', cols: 3, validators: [Validators.required] },
  ]);

  form!: FormGroup;



  constructor(private utenteService: UtenteService, private router: Router,
    private ruoliService: RuoliService
  ) { }


  ngOnInit() {
    this.ruoliService.getRuoliUtente().subscribe(ruoli => {
      this.listaRuoli.set(ruoli);
    })
  }
  onFormSubmit(formData: any) {
    this.newUtente = formData as UtenteRequest;
    this.newUtente.idSede = Number(this.newUtente.idSede);
    this.utenteService.creaUtente(this.newUtente).subscribe({
      next: () => {
        this.router.navigate(['/listaUtenti']);
      },
      error: err => {
        this.form.get('email')?.setErrors({
          duplicateKey: true
        });
      }
    });
    console.log(this.newUtente);

  }

  onFormCreated(form: FormGroup) {
    this.form = form;
  }


}

/*

export function duplicateKeyValidator(value: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = !value;
    return isValid ? null : { 'utente già registrato': true };
  };
}

*/
