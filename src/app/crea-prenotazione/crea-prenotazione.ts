import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { PrenotazioneRequest } from '../model/PrenotazioneRequest';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Form } from '../form/form';
import { Sede } from '../model/Sede';
import { SedeService } from '../service/sede/sede-service';
import { FormDefinitions } from '../model/FormDefinition';

@Component({
  selector: 'app-crea-prenotazione',
  imports: [Form],
  templateUrl: './crea-prenotazione.html',
  styleUrl: './crea-prenotazione.css',
})
export class CreaPrenotazione {

  datiPrenotazione?: PrenotazioneRequest;
  listaSedi = signal<Sede[]>([]);

  constructor(private prenotazioneService: PrenotazioneService, private sedeService: SedeService, private router: Router,
  ) {
  }


  ngOnInit() {
    this.sedeService.getListaSedi().subscribe(sede => {
      this.listaSedi.set(sede);
      console.log(this.listaSedi);
    })
  }

  prenotazioneFormConfig = signal<FormDefinitions<any>[]>([
    { name: "npostazione", type: "select", label: 'numero postazione', cols: 4, validators: [Validators.required] },
    { name: "dataInizio", type: 'datetime-local', label: 'data inizio', cols: 4, validators: [Validators.required] },
    { name: "dataFine", type: 'datetime-local', label: 'data fine', cols: 4, validators: [Validators.required] },
  ]);

  onFormSubmit(formData: any) {
    this.datiPrenotazione = formData as PrenotazioneRequest;
    this.prenotazioneService.aggiungiPrenotazione(this.datiPrenotazione, parseInt(sessionStorage.getItem("userId")!)).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      }
    });
    console.log(this.datiPrenotazione);
  }

}
