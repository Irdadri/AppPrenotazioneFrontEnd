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

    getUtenti(): Observable<Page<UtenteDTO>>{
        return this.http.get<Page<UtenteDTO>>(this.url);
    }

    getPageUtente(page: Number): Observable<Page<UtenteDTO>>{
        return this.http.get<Page<UtenteDTO>>('/getPage' + page);
    }

    getUtente(id:Number):Observable<UtenteDTO>{
        return this.http.get<UtenteDTO>('/getTypeUser');
    }

    getMockUtenti():Observable<MockUser[]>{
        return this.http.get<MockUser[]>(this.mockUrl);
    }

    creaUtente(utente:UtenteRequest){
        return this.http.post<UtenteRequest>;
    }

    modificaUtente(modifiche: UtenteRequest,id: Number){
        return this.http.put<UtenteRequest>;
    }

    eliminaUtente(id: Number){
        return this.http.delete(''+id);
    }
}
