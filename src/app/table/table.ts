import { Component, computed, EventEmitter, Input, input, output, Output } from '@angular/core';
import { IColumnDef } from '../model/IColumnDef';
import { RouterLink } from '@angular/router';
import { Page } from '../model/Page';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-table',
  imports: [RouterLink, MatPaginatorModule, MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {

  constructor() { }


  public tableTitle = input.required<String>();
  public tableHeader = input.required<IColumnDef<any>[]>();
  public data = input.required<Page<any>>();
  public url = input.required<String>();

  public totalPages = computed(() =>
    this.data().totalPages
  );
  public pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i)
  );
  public pageSize = computed(() =>
    this.data().size
  );



  elimina = output<Number>();
  pagina = output<Number>()

  eliminaEvent(id: Number) {
    console.log(id);
    this.elimina.emit(id);
  }

  vaiAPagina(pageNum: Number) {
    this.pagina.emit(pageNum);
  }

}
