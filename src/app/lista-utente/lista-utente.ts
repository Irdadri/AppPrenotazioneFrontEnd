import { Component } from '@angular/core';
import { UtenteDTO } from '../model/UtenteDTO';
import { IColumnDef } from '../model/IColumnDef';
import { UtenteService } from '../service/utente/utente-service';
import { USER_LIST } from '../model/constant';
import { Table } from '../table/table';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Page } from '../model/Page';
import { Toolbar } from '../toolbar/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-lista-utente',
  imports: [Table, Toolbar, MatCardModule, MatDividerModule],
  templateUrl: './lista-utente.html',
  styleUrl: './lista-utente.css',
})
export class ListaUtente {

  constructor(private utenteService: UtenteService,
    private location:Location
  ) { }


  utenti!: Page<UtenteDTO>;
  utentiHeader: IColumnDef<any>[] = [];
  url = "/utente/modfica/";
  totalPages: Number = 1;
  tableTitle = "Utenti";

  tipoUtente!: String;
  pagina = "listaUtenti";

  ngOnInit() {
    this.utenteService.getPageUtente(0).subscribe(utenti => {
      this.utenti = utenti;
      this.utentiHeader = USER_LIST;
      this.totalPages = utenti.totalPages;
    });

    this.tipoUtente = sessionStorage.getItem("tipoUtente")!;
  }

  goBack(){
    this.location.back();
  }

  eliminaPrenotazioneParent(value: Number) {
    console.log(value);
    this.utenteService.eliminaUtente(value);
  }

  aPagina(page: Number){
     this.utenteService.getPageUtente(page).subscribe(utenti => {
      this.utenti = utenti;
    });
  }
}
