import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { PrenotazioniFiltro } from '../model/PrenotazioniFiltro';
import { FormDefinitions } from '../model/FormDefinition';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { Page } from '../model/Page';
import { Form } from '../form/form';

@Component({
  selector: 'app-search-prenotazione',
  imports: [Form],
  templateUrl: './search-prenotazione.html',
  styleUrl: './search-prenotazione.css',
})
export class SearchPrenotazione {

  constructor(private prenotazioneService: PrenotazioneService, private cdr: ChangeDetectorRef) { }


  cercaPrenotazione!: FormDefinitions<any>[];

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
  @Output() searchPrenotazione = new EventEmitter<PrenotazioniFiltro>;

  ngOnInit() {
    this.tipoUtente = sessionStorage.getItem('tipoUtente')!;
    this.userId = parseInt(sessionStorage.getItem("userId")!);

    if (this.tipoUtente === "manager") {
      this.cercaPrenotazione = this.cercaPrenotazioneFormConfig;
    } else if (this.tipoUtente === "user") {
      this.cercaPrenotazione = this.cercaPrenotazioniUtente;
    }
  }

  onFormSubmit(searchData: any) {
    this.searchPrenotazione.emit(searchData);
  
  }


}
