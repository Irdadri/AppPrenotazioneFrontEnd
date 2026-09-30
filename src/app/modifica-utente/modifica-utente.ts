import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { UtenteDTO } from '../model/UtenteDTO';
import { UtenteRequest } from '../model/UtenteRequest';
import { UtenteService } from '../service/utente/utente-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Form } from '../form/form';
import { RuoliService } from '../service/ruoli/ruoli-service';
import { FormDefinitions } from '../model/FormDefinition';
@Component({
  selector: 'app-modifica-utente',
  imports: [Form],
  templateUrl: './modifica-utente.html',
  styleUrl: './modifica-utente.css',
})
export class ModificaUtente {

  utenti = signal<UtenteDTO | null>(null);
  userKey?: String;
  modifiche?: UtenteRequest;
  listaRuoli = signal<String[]>([]);

  constructor(private utenteService: UtenteService, private route: ActivatedRoute, private router: Router,
    private ruoliService: RuoliService,
  ) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userKey = params.get('userKey')!;
      console.log(this.userKey);
      this.utenteService.getUtente(this.userKey!).subscribe(utenti => {
        this.utenti.set(utenti);
        console.log("da utenti modifica")
        console.log(this.utenti());
        this.ruoliService.getRuoliUtente().subscribe(ruoli => {
          this.listaRuoli.set(ruoli);
        })
      });
    })

    console.log(this.utenti);
  }


  creaUtenteFormConfig = signal<FormDefinitions<any>[]>([
    { name: "nome", type: 'text', label: 'nome', cols: 4, validators: [Validators.required] },
    { name: "cognome", type: 'cognome', label: 'cognome', cols: 4, validators: [Validators.required] },
    { name: "email", type: 'email', label: 'email', cols: 4, validators: [Validators.required] },
    { name: "password", type: 'password', label: 'password', cols: 3, validators: [Validators.required] },
    { name: "telefono", type: 'number', label: 'telefono', cols: 3, validators: [Validators.required] },
    { name: "tipoUtente", type: 'select', label: 'tipoUtente', cols: 3, validators: [Validators.required] },
    { name: "idSede", type: "number", label: 'idSede', cols: 3, validators: [Validators.required] },
  ]);

  onFormSubmit(formData: any) {
    this.modifiche = formData as UtenteRequest;
    this.utenteService.modificaUtente(this.modifiche, this.userKey!).subscribe({
      next: () => {
        this.router.navigate(['/listaUtenti']);
      }
    });;
    console.log(this.modifiche);
    
  }

}
