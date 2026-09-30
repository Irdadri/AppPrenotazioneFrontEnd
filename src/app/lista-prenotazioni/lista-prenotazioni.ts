import { Component, input, Input, signal } from '@angular/core';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../model/Page';
import { PrenotazioneDTO } from '../model/PrenotazioneDTO';
import { IColumnDef } from '../model/IColumnDef';
import { Table } from '../table/table';
import { Validators } from '@angular/forms';
import { PrenotazioniFiltro } from '../model/PrenotazioniFiltro';
import { Form } from '../form/form';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ChangeDetectorRef } from '@angular/core';
import { SearchPrenotazione } from '../search-prenotazione/search-prenotazione';
import { Ruoli } from '../model/Ruoli';

@Component({
  selector: 'app-lista-prenotazioni',
  imports: [Table, MatCardModule, MatDividerModule, SearchPrenotazione],
  templateUrl: './lista-prenotazioni.html',
  styleUrl: './lista-prenotazioni.css',
})
export class ListaPrenotazioni {

  readonly Ruoli = Ruoli;

  constructor(private prenotazioneService: PrenotazioneService,
  ) { }


  prenotazioniTest = signal<Page<PrenotazioneDTO>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    numberOfElements: 0,
    first: true,
    last: true,
    empty: true,
  });


  loading = signal<boolean>(true);

  tableHeader = signal<IColumnDef<any>[]>([]);
  url = signal<String>('/prenotazione/modifica/');

  userKey = input.required<String>();
  tipoUtente = input.required<String>();
  tableTitle = signal<String>("Prenotazioni");

  searchPrenotazione: PrenotazioniFiltro = {
    dataInizio: undefined,
    dataFine: undefined,
    email: undefined,
  };

  ngOnInit() {
    this.prenotazioneService.getPrenotazioniPageOne(this.userKey()).subscribe(prenotazioni => {

      console.log(this.userKey());
      console.log(this.tipoUtente());

      if (this.tipoUtente() === Ruoli.amministratore) {
        this.tableHeader.set(this.prenotazioneService.getHeader('manager'));

      } else if (this.tipoUtente() === Ruoli.utente) {
        this.tableHeader.set(this.prenotazioneService.getHeader('user'));
      }

      this.prenotazioniTest.set(prenotazioni);
      console.log(this.prenotazioniTest());
      console.log(this.tableHeader());
      this.loading.set(false);


    })
  }

  eliminaPrenotazioneParent(value: Number) {
    console.log(value);
    this.prenotazioneService.eliminaPrenotazione(value).subscribe(() => {
      this.loadPrenotazioni(this.userKey(), this.tipoUtente());
    });
  }

  aPagina(page: Number) {
    console.log(page);

    if (this.tipoUtente() === Ruoli.amministratore) {
      this.prenotazioneService.getAllPrenotazioniByFilter(this.searchPrenotazione, page).subscribe(prenotazioni => {
        this.prenotazioniTest.set(prenotazioni);
        this.tableHeader.set(this.prenotazioneService.getHeader('manager'));

        console.log("dal metodo aPagina");
        console.log(this.prenotazioniTest);
        console.log(this.searchPrenotazione);
        this.loading.set(false);


      });
    } else if (this.tipoUtente() === Ruoli.utente) {
      this.prenotazioneService
        .getPrenotazioneUtenteByFilter(this.searchPrenotazione, this.userKey(), page)
        .subscribe(prenotazioni => {
          this.prenotazioniTest.set(prenotazioni);
          this.tableHeader.set(this.prenotazioneService.getHeader('user'));
          this.loading.set(false);

        });
    }
  }

  onFormParent(data: any) {
    this.searchPrenotazione = data as PrenotazioniFiltro;
    if (this.searchPrenotazione.email === '') {
      this.searchPrenotazione.email = undefined;
    } if (this.searchPrenotazione.dataInizio === '') {
      this.searchPrenotazione.dataInizio = undefined;
    }
    if (this.searchPrenotazione.dataFine === '') {
      this.searchPrenotazione.dataFine = undefined;
    }
    console.log(this.searchPrenotazione);

    this.loadPrenotazioni(this.userKey(), this.tipoUtente());
  }



  loadPrenotazioni(userKey: String, tipoUtente: String) {
    if (this.tipoUtente() === Ruoli.amministratore) {
      this.prenotazioneService.getAllPrenotazioniByFilter(this.searchPrenotazione, 0).subscribe(prenotazioni => {
        this.prenotazioniTest.set(prenotazioni);
        this.tableHeader.set(this.prenotazioneService.getHeader('manager'));

        console.log("dal metodo aPagina");
        console.log(this.prenotazioniTest);
        console.log(this.searchPrenotazione);
        this.loading.set(false);
      });
    } else if (this.tipoUtente() === Ruoli.utente) {
      this.prenotazioneService
        .getPrenotazioneUtenteByFilter(this.searchPrenotazione, this.userKey(), 0)
        .subscribe(prenotazioni => {
          this.prenotazioniTest.set(prenotazioni);
          this.tableHeader.set(this.prenotazioneService.getHeader('user'));
          this.loading.set(false);
        });
    }
  }

}
