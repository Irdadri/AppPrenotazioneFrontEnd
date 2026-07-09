import { Component } from '@angular/core';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { PrenotazioneRequest } from '../model/PrenotazioneRequest';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Form } from '../form/form';

@Component({
  selector: 'app-crea-prenotazione',
  imports: [Form],
  templateUrl: './crea-prenotazione.html',
  styleUrl: './crea-prenotazione.css',
})
export class CreaPrenotazione {
  prenotazione?: PrenotazioneDTO;
  //prenotazioneId?: Number;
  datiPrenotazione?: PrenotazioneRequest;

  constructor(private prenotazioneService: PrenotazioneService, private route: ActivatedRoute, private router: Router,
    private location: Location
  ) {
  }
  ngOnInit() {

    /*

    this.route.paramMap.subscribe(params => {
      this.prenotazioneId = parseInt(params.get('prenotazioneId')!);
      console.log(this.prenotazioneId);
      this.prenotazioneService.getPrenotazioneById(this.prenotazioneId).subscribe(prenotazione => {
        this.prenotazione = prenotazione;
      });
    })
 */
    console.log(this.prenotazione);
  }

  prenotazioneFormConfig = [
    { name: "nPostazione", type: 'text', label: 'npostazione', cols: 4, validators: [Validators.required] },
    { name: "dataInizio", type: 'date', label: 'datainizio', cols: 4, validators: [Validators.required] },
    { name: "dataFine", type: 'date', label: 'datafine', cols: 4, validators: [Validators.required] },
  ]

  onFormSubmit(formData: any) {
    this.datiPrenotazione = formData as PrenotazioneRequest;
    this.prenotazioneService.aggiungiPrenotazione(this.datiPrenotazione);
    console.log(this.datiPrenotazione);
    this.location.back();
  }

}
