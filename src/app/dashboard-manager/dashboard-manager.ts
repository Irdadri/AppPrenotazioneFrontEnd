import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListaPrenotazioni } from '../lista-prenotazioni/lista-prenotazioni';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'app-dashboard-manager',
  imports: [ListaPrenotazioni, Toolbar],
  templateUrl: './dashboard-manager.html',
  styleUrl: './dashboard-manager.css',
})
export class DashboardManager {

  userId!: Number;
  tipoUtente!: String;
  pagina = "dashboard";

  ngOnInit(){
    this.userId = parseInt(sessionStorage.getItem("userId")!);
    console.log("utente" + this.userId);
    this.tipoUtente = sessionStorage.getItem("tipoUtente")!;
    console.log("tipo utente" + this.tipoUtente);
  }

  

}
