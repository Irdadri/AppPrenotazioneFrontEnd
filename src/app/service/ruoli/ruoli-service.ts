import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class RuoliService {
    
    private http = inject(HttpClient);
    private realUrl = "http://localhost:8080/dashboard/listaRuoli";

    getRuoliUtente():Observable<String[]>{
        return this.http.get<String[]>(this.realUrl);
    }
}
