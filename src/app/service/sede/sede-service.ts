import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../../model/Sede';
import { HttpClient } from '@angular/common/http';

@Service()
export class SedeService {

    private http = inject(HttpClient);
    private realUrl = "http://localhost:8080/dashboard/listaSedi";

    getListaSedi(): Observable<Sede[]> {
        return this.http.get<Sede[]>(this.realUrl);
    }
}
