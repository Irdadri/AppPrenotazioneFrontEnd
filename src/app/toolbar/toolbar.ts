import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {

  @Input() tipoUtente!: String;
  @Input() pagina!: String;
}
