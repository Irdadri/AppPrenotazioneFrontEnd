import { Component, signal } from '@angular/core';
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

  userKey = signal<String>('');
  tipoUtente = signal<String>('');
  pagina = "dashboard";

  ngOnInit(){
    this.userKey.set((sessionStorage.getItem("userKey")!));
    console.log("utente" + this.userKey);
    
    this.tipoUtente.set(sessionStorage.getItem("tipoUtente")!);
    console.log("tipo utente" + this.tipoUtente);

  }



}
