import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrenotazioneDTO } from '../../model/PrenotazioneDTO';
import { UtenteService } from '../utente/utente-service';
import { MockUser } from '../../model/MockUser';
import { MANAGER_TABLE_COLUMNS, USER_TABLE_COLUMNS } from '../../model/constant';
import { IColumnDef } from '../../model/IColumnDef';
import { map } from 'rxjs/operators';
import { PrenotazioneRequest } from '../../model/PrenotazioneRequest';
import { Page } from '../../model/Page';
import { PrenotazioniFiltro } from '../../model/PrenotazioniFiltro';

@Service()
export class PrenotazioneService {

    private http = inject(HttpClient);
    private pagingURL = 'PRENOTAZIONI';
    private prenotazioneURLnoPaging = "PRENOTAZIONI_MOCK";
    private marioprenotazioneURl = 'PRENOTAZIONI_MARIO_MOCK';

    private realUrl = "http://localhost:8080/dashboard/"

    getPrenotazioni(): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(this.prenotazioneURLnoPaging);
    }

    getPrenotazioniUtente(idUtente: Number): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(this.marioprenotazioneURl);
    }

    getPrenotazioniByPage(page: Number, size: Number, idUser: Number): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(this.realUrl + "?page=" + page + "&" + "size=" + size + "&" + "idUser=" +  + idUser);
    }

    getPrenotazioniPageOne(idUtente: Number): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(this.realUrl + "?idUser=" + idUtente);
    }

    getPrenotazioneById(id: Number) {
        /*
        return this.http.get<PrenotazioneDTO[]>(this.prenotazioneUrl).pipe(
            map(prenotazioni => prenotazioni.find(p => p.id === id))
        );
        
        return this.http.get<PrenotazioneDTO>(
            `${this.prenotazioneURLnoPaging}/${id}`
        );
        */

        return this.http.get<PrenotazioneDTO>(this.realUrl + "prenotazione?idPrenotazione=" + id);

    }

    getPrenotazioneUtenteByFilter(filtro: PrenotazioniFiltro, idUser: Number, page:Number): Observable<Page<PrenotazioneDTO>>{
       return this.http.post<Page<PrenotazioneDTO>>(this.realUrl + "searchPrenotazioniUtente?idUser=" + idUser + "&page=" + page, filtro);
    }

    getAllPrenotazioniByFilter(filtro:PrenotazioniFiltro, page: Number): Observable<Page<PrenotazioneDTO>>{
        return this.http.post<Page<PrenotazioneDTO>>(this.realUrl + "searchPrenotazioni" + "?page=" + page, filtro)
    }

    aggiornaPrenotazione(modifiche: PrenotazioneRequest, id: Number) {
        return this.http.put<PrenotazioneRequest>( this.realUrl + "aggiornaPrenotazione?idPrenotazione=" + id, 
            modifiche
        );
    }

    aggiungiPrenotazione(datiPrenotazione: PrenotazioneRequest, idUser: Number) {
        return this.http.post<PrenotazioneRequest>(this.realUrl + "prenotazione" + "?idUser=" + idUser,
            datiPrenotazione
        );
    }

    getHeader(tipoUtente: String) {
        if (tipoUtente === "user") {
            return USER_TABLE_COLUMNS.filter(col => col.visible !== false);
        } else {
            return MANAGER_TABLE_COLUMNS;
        }
    }

    eliminaPrenotazione(id: Number) {
        return this.http.delete<void>(this.realUrl + "delete/" + id);
    }



}
