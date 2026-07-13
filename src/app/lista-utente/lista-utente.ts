import { ChangeDetectorRef, Component, input, signal } from '@angular/core';
import { UtenteDTO } from '../model/UtenteDTO';
import { IColumnDef } from '../model/IColumnDef';
import { UtenteService } from '../service/utente/utente-service';
import { USER_LIST } from '../model/constant';
import { Table } from '../table/table';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Page } from '../model/Page';
import { Toolbar } from '../toolbar/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-lista-utente',
  imports: [Table, Toolbar, MatCardModule, MatDividerModule],
  templateUrl: './lista-utente.html',
  styleUrl: './lista-utente.css',
})
export class ListaUtente {

  constructor(private utenteService: UtenteService,
  ) { }


  utenti = signal<Page<UtenteDTO>>({
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

  utentiHeader = signal<IColumnDef<any>[]>([]);
  url = signal<String>('/utente/modfica/');
  userId = signal<Number>(0);
  tipoUtente = signal<String>('');
  tableTitle = signal<String>("Utenti");
  pagina = "listaUtenti";
  ngOnInit() {
    this.utenteService.getUtentiPageOne().subscribe(utenti => {
      this.utentiHeader.set(USER_LIST);
      this.utenti.set(utenti);
      this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
    });

  }

  eliminaPrenotazioneParent(value: Number) {
    console.log(value);
    this.utenteService.eliminaUtente(value).subscribe(() => {
      this.utenteService.getUtentiPageOne().subscribe(utenti => {
        this.utentiHeader.set(USER_LIST);
        this.utenti.set(utenti);
        this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
      });
    });
  }

  aPagina(page: Number) {
    this.utenteService.getUtentiNextPage(page, 5).subscribe(utenti => {
      this.utentiHeader.set(USER_LIST);
      this.utenti.set(utenti);
      this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
    });
  }
}
