import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { PrenotazioneService } from '../service/prenotazione/prenotazione-service';
import { UtenteService } from '../service/utente/utente-service';
import { ActivatedRoute } from '@angular/router';
import { IColumnDef } from '../model/IColumnDef';
import { RouterLink } from '@angular/router';
import { Page } from '../model/Page';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-table',
  imports: [RouterLink, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  constructor() { }

  //prenotazioniTest = input<PrenotazioneDTO>();

  //tipoUtente = input<string>();
  //idUser = input<Number>();
  //tableHeader = input<IColumnDef<PrenotazioneDTO>[]>();


  //mi serve un tableHeader
  //e un array di dati, utente o prenotazione
  private _tableHeader!: IColumnDef<any>[]
  @Input() 
  set tableHeader(value: any){
    console.log("TABLE RICEVE:", value);
    this._tableHeader = value;
  }
  get tableHeader(){
    return this._tableHeader
  }

  public _data!: Page<any>;
   @Input()
  set data(value:any){
      console.log("TABLE RICEVE:", value);
    this._data = value;
  }
  get data(): Page<any>{
    return this._data;
  }

  @Input() url!: string;
  @Input() tableTitle!: string;
  //paging variables
  @Input() totalPages: Number = 10;
  @Input() pageSize: Number = 10;
  pages: number[] = [];

  ngOnChanges() {
    this.pages = Array(this.totalPages).fill(0).map((_, i) => i);
  }

  @Output() elimina: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() pagina: EventEmitter<Number> = new EventEmitter<Number>();

  eliminaEvent(id: Number) {
    console.log(id);
    this.elimina.emit(id);
  }

  vaiAPagina(pageNum: Number){
    this.pagina.emit(pageNum);
  }

}
