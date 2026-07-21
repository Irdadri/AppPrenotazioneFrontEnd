import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Ruoli } from '../model/Ruoli';
import { LoginJwtService } from '../service/login/login-jwt-service';



@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  readonly Ruoli = Ruoli;

  @Input() tipoUtente!: String;
  @Input() pagina!: String;
  constructor(private auth: LoginJwtService, private router:Router) { }

  logout() {
    this.auth.clearAll();
    this.router.navigate(['']);
  }

}
