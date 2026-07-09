import { Routes } from '@angular/router';
import { Login } from './login/login';
import { DashboardManager } from './dashboard-manager/dashboard-manager';
import { ModificaPrenotazione } from './modifica-prenotazione/modifica-prenotazione';
import { CreaUtente } from './crea-utente/crea-utente';
import { ListaUtente } from './lista-utente/lista-utente';
import { CreaPrenotazione } from './crea-prenotazione/crea-prenotazione';
import { ModificaUtente } from './modifica-utente/modifica-utente';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'dashboard', component: DashboardManager },
   // { path: 'dashboard/:id/utente', component: DashboardUtente },
    { path: 'prenotazione/modifica/:prenotazioneId', component: ModificaPrenotazione },
    { path: 'utente/modfica/:userId', component: ModificaUtente},
    { path: 'creaUtente', component: CreaUtente },
    { path: 'listaUtenti', component: ListaUtente },
    { path: 'creaPrenotazione', component: CreaPrenotazione }
];
