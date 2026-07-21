import { ChangeDetectorRef, Component, EventEmitter, output, Output, signal } from '@angular/core';
import { PrenotazioniFiltro } from '../model/PrenotazioniFiltro';
import { FormDefinitions } from '../model/FormDefinition';

import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';

import { Form } from '../form/form';
import { Ruoli } from '../model/Ruoli';

@Component({
  selector: 'app-search-prenotazione',
  imports: [Form],
  templateUrl: './search-prenotazione.html',
  styleUrl: './search-prenotazione.css',
})
export class SearchPrenotazione {
  readonly Ruoli = Ruoli;

  constructor(private prenotazioneService: PrenotazioneService, private cdr: ChangeDetectorRef) { }


  cercaPrenotazione = signal<FormDefinitions<any>[]>([]);

  cercaPrenotazioneFormConfig = [
    { name: "email", type: 'email', label: 'email', cols: 4, validators: undefined },
    { name: "dataInizio", type: 'datetime-local', label: 'dataInizio', cols: 4, validators: undefined },
    { name: "dataFine", type: 'datetime-local', label: 'dataFine', cols: 4, validators: undefined },
  ]

  cercaPrenotazioniUtente = [
    { name: "dataInizio", type: 'datetime-local', label: 'dataInizio', cols: 6, validators: undefined },
    { name: "dataFine", type: 'datetime-local', label: 'dataFine', cols: 6, validators: undefined },
  ]



  tipoUtente!: String;
  userId!: Number;
  searchPrenotazione = output<PrenotazioniFiltro>();

  ngOnInit() {
    this.tipoUtente = sessionStorage.getItem('tipoUtente')!;
    this.userId = parseInt(sessionStorage.getItem("userId")!);

    if (this.tipoUtente === Ruoli.amministratore) {
      this.cercaPrenotazione.set(this.cercaPrenotazioneFormConfig);
    } else if (this.tipoUtente === Ruoli.utente) {
      this.cercaPrenotazione.set(this.cercaPrenotazioniUtente);
    }
  }

  onFormSubmit(searchData: any) {
    this.searchPrenotazione.emit(searchData);
  
  }


}
