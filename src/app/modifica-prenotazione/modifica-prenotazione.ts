import { Component } from '@angular/core';
import { Validators } from '@angular/forms';;
import { Form } from '../form/form';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioneRequest } from '../model/PrenotazioneRequest';
import {Location} from '@angular/common';

@Component({
  selector: 'app-modifica-prenotazione',
  imports: [Form],
  templateUrl: './modifica-prenotazione.html',
  styleUrl: './modifica-prenotazione.css',
})
export class ModificaPrenotazione {

  prenotazione?:PrenotazioneDTO;
  prenotazioneId?: Number;
  modifiche?:PrenotazioneRequest;


  constructor(private prenotazioneService: PrenotazioneService, private route: ActivatedRoute, private router: Router,
    private location: Location
  ){
  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(params =>{
      this.prenotazioneId = parseInt(params.get('prenotazioneId')!);
      console.log(this.prenotazioneId);
      this.prenotazioneService.getPrenotazioneById(this.prenotazioneId).subscribe(prenotazione =>{
        this.prenotazione = prenotazione;
      });
    })

    console.log(this.prenotazione);
  }

  prenotazioneFormConfig = [
    {name: "nPostazione", type:'text', label:'npostazione', cols:4, validators:[Validators.required]},
    {name: "dataInizio", type:'date', label:'datainizio', cols:4,validators:[Validators.required]},
    {name: "dataFine", type:'date', label:'datafine',cols:4, validators:[Validators.required]},
  ]

  onFormSubmit(formData: any){
    this.modifiche = formData as PrenotazioneRequest;
    this.prenotazioneService.aggiornaPrenotazione(this.modifiche, this.prenotazioneId!);
    console.log(this.modifiche);
    this.location.back();
  }

}
