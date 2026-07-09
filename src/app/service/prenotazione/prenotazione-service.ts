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

    getPrenotazioniByPage(page: Number): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(
            `${this.pagingURL}_PAGE_${page}`
        );
    }

    getPrenotazioniWithPaging(idUtente: Number): Observable<Page<PrenotazioneDTO>> {
        return this.http.get<Page<PrenotazioneDTO>>(this.realUrl + "?idUser=" + idUtente);
    }

    getPrenotazioneById(id: Number) {
        /*
        return this.http.get<PrenotazioneDTO[]>(this.prenotazioneUrl).pipe(
            map(prenotazioni => prenotazioni.find(p => p.id === id))
        );
        */
        return this.http.get<PrenotazioneDTO>(
            `${this.prenotazioneURLnoPaging}/${id}`
        );

    }

    getPrenotazioneByFilter(filtro: PrenotazioniFiltro): Observable<Page<PrenotazioneDTO>>{
       return this.http.get<Page<PrenotazioneDTO>>(this.marioprenotazioneURl);
    }

    aggiornaPrenotazione(modifiche: PrenotazioneRequest, id: Number) {
        return this.http.put<PrenotazioneRequest>(
            `${this.prenotazioneURLnoPaging}/${id}`,
            modifiche
        );
    }

    aggiungiPrenotazione(datiPrenotazione: PrenotazioneRequest) {
        return this.http.post<PrenotazioneRequest>(
            `${this.prenotazioneURLnoPaging}/`,
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
        return this.http.delete<void>(
            `${this.prenotazioneURLnoPaging}/${id}`
        );
    }



}
