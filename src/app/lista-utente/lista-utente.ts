import { ChangeDetectorRef, Component, input, signal } from '@angular/core';
import { UtenteDTO } from '../model/UtenteDTO';
import { IColumnDef } from '../model/IColumnDef';
import { UtenteService } from '../service/utente/utente-service';
import { USER_LIST } from '../model/constant';
import { Table } from '../table/table';
import { Location } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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

  loading = signal<boolean>(true);

  constructor(private utenteService: UtenteService,
  private router: Router) { }


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
  userKey = signal<String>('');
  tipoUtente = signal<String>('');
  tableTitle = signal<String>("Utenti");
  pagina = "listaUtenti";
  ngOnInit() {
    this.utenteService.getUtentiPageOne().subscribe(utenti => {
      this.utentiHeader.set(USER_LIST);
      this.utenti.set(utenti);
      this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
      this.loading.set(false);
    });

  }

  eliminaUtenteParent(value: any) {
    console.log(value);
    if (value === parseInt(sessionStorage.getItem('userKey')!)) {
      //non può eliminare se stesso!!
      this.router.navigate(['forbidden']);
    } else {
      this.utenteService.eliminaUtente(value).subscribe(() => {
        this.utenteService.getUtentiPageOne().subscribe(utenti => {
          this.utentiHeader.set(USER_LIST);
          this.utenti.set(utenti);
          this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
          this.loading.set(false);
        });
      });
    }
  }

  aPagina(page: Number) {
    this.utenteService.getUtentiNextPage(page, 5).subscribe(utenti => {
      this.utentiHeader.set(USER_LIST);
      this.utenti.set(utenti);
      this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
      this.loading.set(false);
    });
  }
}
