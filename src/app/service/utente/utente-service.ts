import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { UtenteDTO } from '../../model/UtenteDTO';
import { HttpClient } from '@angular/common/http';
import { MockUser } from '../../model/MockUser';
import { UtenteRequest } from '../../model/UtenteRequest';
import { Page } from '../../model/Page';

@Service()
export class UtenteService {

    private http = inject(HttpClient);
    private url = '/get-user-list';
    private mockUrl = '/get-mock-user';
    private realUrl = "http://localhost:8080/dashboard/";

    getUtentiPageOne(): Observable<Page<UtenteDTO>> {
        return this.http.get<Page<UtenteDTO>>(this.realUrl + "utenti");
    }

    getUtentiNextPage(page: Number, size: Number): Observable<Page<UtenteDTO>> {
        return this.http.get<Page<UtenteDTO>>(this.realUrl + "utenti" + "?page=" + page + "&" + "size=" + size);
    }
    
    creaUtente(utente: UtenteRequest) {
        return this.http.post(this.realUrl + "signup", utente);
    }


    getPageUtente(page: Number): Observable<Page<UtenteDTO>>{
        return this.http.get<Page<UtenteDTO>>('/getPage' + page);
    }

    getUtente(id:Number):Observable<UtenteDTO>{
        return this.http.get<UtenteDTO>(this.realUrl + "utente?idUtente=" + id);
    }

    getMockUtenti():Observable<MockUser[]>{
        return this.http.get<MockUser[]>(this.mockUrl);
    }

    modificaUtente(modifiche: UtenteRequest, id: Number) {
        return this.http.put<UtenteRequest>(this.realUrl + "aggiornaUtente?idUser=" + id, modifiche);
    }

    eliminaUtente(id: Number) {
        return this.http.delete<void>(this.realUrl + "deleteUtente/" + id);
    }
}
