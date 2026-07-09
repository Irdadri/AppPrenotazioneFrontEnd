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

@Component({
  selector: 'app-lista-prenotazioni',
  imports: [Table, Form, MatCardModule, MatDividerModule],
  templateUrl: './lista-prenotazioni.html',
  styleUrl: './lista-prenotazioni.css',
})
export class ListaPrenotazioni {
  constructor(private prenotazioneService: PrenotazioneService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  prenotazioniTest!: Page<PrenotazioneDTO>;
  tableHeader: IColumnDef<any>[] = [];
  url = '/prenotazione/modifica/';
  totalPages: Number = 1;
  @Input() userId!: Number;
  @Input() tipoUtente!: String;
  tableTitle = "Prenotazioni";

  cercaPrenotazioneFormConfig = [
    { name: "email", type: 'text', label: 'email', cols: 4, validators: undefined },
    { name: "dataInizio", type: 'date', label: 'dataInizio', cols: 4, validators: undefined },
    { name: "dataFine", type: 'date', label: 'dataFine', cols: 4, validators: undefined },
  ]
  searchPrenotazione!: PrenotazioniFiltro;

  ngOnInit() {

    /*
    if (this.tipoUtente === "manager") {
      this.prenotazioneService
        .getPrenotazioniByPage(0)
        .subscribe(prenotazioni => {
          this.prenotazioniTest = prenotazioni;
          this.tableHeader =
            this.prenotazioneService.getHeader('manager');
          this.totalPages = this.prenotazioniTest.totalPages;
          console.log(this.totalPages);
        });
      console.log(this.prenotazioniTest);
    } else if (this.tipoUtente === "utente") {
      this.prenotazioneService.getPrenotazioniUtente(this.userId).subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
        this.tableHeader =
          this.prenotazioneService.getHeader('utente');
        this.totalPages = this.prenotazioniTest.totalPages;
        console.log(this.totalPages);
      });
    }
      */

    this.prenotazioneService.getPrenotazioniWithPaging(this.userId).subscribe(prenotazioni => {

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
      this.totalPages = this.prenotazioniTest.totalPages;
      console.log(this.prenotazioniTest);
      console.log(this.tableHeader);
      this.cdr.detectChanges();
    })
  }

  ngOnChanges() {

  }

  eliminaPrenotazioneParent(value: Number) {
    console.log(value);
    this.prenotazioneService.eliminaPrenotazione(value);
  }

  aPagina(page: Number) {
    console.log(page);
    if (this.tipoUtente === "manager") {
      this.prenotazioneService.getPrenotazioniByPage(page).subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
      })
    } else {
      this.prenotazioneService.getPrenotazioniUtente(this.userId).subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
      })
    }
  }

  onFormSubmit(searchData: any) {
    this.searchPrenotazione = searchData as PrenotazioniFiltro;
    this.prenotazioneService
      .getPrenotazioneByFilter(this.searchPrenotazione)
      .subscribe(prenotazioni => {
        this.prenotazioniTest = prenotazioni;
        this.totalPages = prenotazioni.totalPages;
      });

  }
}
