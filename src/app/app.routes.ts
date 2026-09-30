import { Routes } from '@angular/router';
import { Login } from './login/login';
import { DashboardManager } from './dashboard-manager/dashboard-manager';
import { ModificaPrenotazione } from './modifica-prenotazione/modifica-prenotazione';
import { CreaUtente } from './crea-utente/crea-utente';
import { ListaUtente } from './lista-utente/lista-utente';
import { CreaPrenotazione } from './crea-prenotazione/crea-prenotazione';
import { ModificaUtente } from './modifica-utente/modifica-utente';
import { Ruoli } from './model/Ruoli';
import { RouteGuardService } from './service/routeGuard/route-guard-service';
import { Forbidden } from './forbidden/forbidden';
import { Error } from './error/error';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'dashboard', component: DashboardManager, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore, Ruoli.utente]}},
   // { path: 'dashboard/:id/utente', component: DashboardUtente },
    { path: 'prenotazione/modifica/:prenotazioneId', component: ModificaPrenotazione, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore, Ruoli.utente]}},
    { path: 'utente/modfica/:userKey', component: ModificaUtente, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore]}},
    { path: 'creaUtente', component: CreaUtente, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore]} },
    { path: 'listaUtenti', component: ListaUtente, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore]} },
    { path: 'creaPrenotazione', component: CreaPrenotazione, canActivate:[RouteGuardService], data: {roles: [Ruoli.amministratore, Ruoli.utente]} },
    {path: 'forbidden', component:Forbidden},
    {path : '**', component: Error}
];
