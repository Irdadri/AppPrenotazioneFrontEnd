import { Component } from '@angular/core';
import { UtenteDTO } from '../model/UtenteDTO';
import { UtenteRequest } from '../model/UtenteRequest';
import { UtenteService } from '../service/utente/utente-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Form } from '../form/form';
@Component({
  selector: 'app-modifica-utente',
  imports: [Form],
  templateUrl: './modifica-utente.html',
  styleUrl: './modifica-utente.css',
})
export class ModificaUtente {
  
  utenti?: UtenteDTO;
  userId?: Number;
  modifiche?:UtenteRequest;

  constructor(private utenteService: UtenteService, private route: ActivatedRoute, private router: Router,
    private location: Location
  ){
  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(params =>{
      this.userId = parseInt(params.get('userId')!);
      console.log(this.userId);
      this.utenteService.getUtente(this.userId).subscribe(utenti =>{
        this.utenti = utenti;
      });
    })

    console.log(this.utenti);
  }

 
  creaUtenteFormConfig = [
    { name: "nome", type: 'text', label: 'nome', cols: 4, validators: [Validators.required] },
    { name: "cognome", type: 'cognome', label: 'datainizio',cols: 4, validators: [Validators.required] },
    { name: "email", type: 'email', label: 'email', cols: 4,validators: [Validators.required] },
    { name: "password", type: 'password', label: 'password',cols: 3, validators: [Validators.required] },
    { name: "telefono", type: 'number', label: 'number',cols: 3, validators: [Validators.required] },
    { name: "tipoUtente", type: 'text', label: 'tipoUtente', cols: 3, validators: [Validators.required] },
    { name: "idSede", type: 'text', label: 'idSede', cols: 3, validators: [Validators.required] },
  ]

  onFormSubmit(formData: any){
      this.modifiche = formData as UtenteRequest;
      this.utenteService.modificaUtente(this.modifiche, this.userId!);
      console.log(this.modifiche);
      this.location.back();

  }

}
