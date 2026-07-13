import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-lista-prenotazioni',
  imports: [Table, MatCardModule, MatDividerModule, SearchPrenotazione],
  templateUrl: './lista-prenotazioni.html',
  styleUrl: './lista-prenotazioni.css',
})
export class ListaPrenotazioni {
  constructor(private prenotazioneService: PrenotazioneService,
    private cdr: ChangeDetectorRef
  ) { }

  prenotazioniTest!: Page<PrenotazioneDTO>;
  tableHeader: IColumnDef<any>[] = [];
  url = '/prenotazione/modifica/';
  totalPages: Number = 1;
  @Input() userId!: Number;
  @Input() tipoUtente!: String;
  tableTitle = "Prenotazioni";
  searchPrenotazione: PrenotazioniFiltro = {
    dataInizio: undefined,
    dataFine: undefined,
    email: undefined,
  };

  ngOnInit() {
    this.prenotazioneService.getPrenotazioniPageOne(this.userId).subscribe(prenotazioni => {

      console.log(this.userId);
      console.log(this.tipoUtente);

      if (this.tipoUtente === "manager") {
        this.tableHeader =
          this.prenotazioneService.getHeader('manager');
      } else if (this.tipoUtente === "user") {
        this.tableHeader =
          this.prenotazioneService.getHeader('user');
      }

      this.prenotazioniTest = prenotazioni;
      console.log("numero pagine  " + this.totalPages);
      console.log(this.prenotazioniTest);
      console.log(this.tableHeader);
      this.cdr.detectChanges();
    })
  }

  eliminaPrenotazioneParent(value: Number) {
    console.log(value);
    this.prenotazioneService.eliminaPrenotazione(value).subscribe(() => {
      this.loadPrenotazioni(this.userId, this.tipoUtente);
    });
  }

  aPagina(page: Number) {
    console.log(page);

    if (this.tipoUtente === "manager") {
      this.prenotazioneService.getAllPrenotazioniByFilter(this.searchPrenotazione, page).subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
        this.tableHeader =
          this.prenotazioneService.getHeader('manager');

        console.log("dal metodo aPagina");
        console.log(this.prenotazioniTest);
        console.log(this.searchPrenotazione);
        this.cdr.detectChanges();
      });
    } else if (this.tipoUtente === "user") {
      this.prenotazioneService
        .getPrenotazioneUtenteByFilter(this.searchPrenotazione, this.userId, page)
        .subscribe(prenotazioni => {
          this.prenotazioniTest = prenotazioni;
          this.tableHeader =
            this.prenotazioneService.getHeader('user');
          this.cdr.detectChanges();
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

    this.loadPrenotazioni(this.userId, this.tipoUtente);
  }




  

  loadPrenotazioni(id: Number, tipoUtente: String) {
    if (this.tipoUtente === "manager") {
      this.prenotazioneService.getAllPrenotazioniByFilter(this.searchPrenotazione, 0).subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
        this.tableHeader =
          this.prenotazioneService.getHeader('manager');

        console.log("dal metodo aPagina");
        console.log(this.prenotazioniTest);
        console.log(this.searchPrenotazione);
        this.cdr.detectChanges();
      });
    } else if (this.tipoUtente === "user") {
      this.prenotazioneService
        .getPrenotazioneUtenteByFilter(this.searchPrenotazione, this.userId, 0)
        .subscribe(prenotazioni => {
          this.prenotazioniTest = prenotazioni;
          this.tableHeader =
            this.prenotazioneService.getHeader('user');
          this.cdr.detectChanges();
        });
    }
  }

}
