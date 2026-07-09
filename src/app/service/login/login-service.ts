import { inject, Service } from '@angular/core';
import { LoginRequest } from '../../model/LoginRequest'; 
import { UtenteService } from '../utente/utente-service';
import { UtenteDTO } from '../../model/UtenteDTO';
import { MockUser } from '../../model/MockUser';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Utente } from '../../model/Utente';

@Service()
export class LoginService {

    private url = '/getTypeUser';
    private urlManager = '/getTypeManager';

    private http = inject(HttpClient);


    private realUrl = "http://localhost:8080/login"

    login(loginRequest: LoginRequest): Observable<Utente> {
        return this.http.post<Utente>(this.realUrl, loginRequest);
    }


    matchUser(loginRequest: LoginRequest): Observable<MockUser>{
        if(loginRequest.email === "mario.rossi@email.com" && loginRequest.password === "Pwd_MarioRossi_01"){
            return this.http.get<MockUser>(this.url);
        } else if(loginRequest.email === "giulia.bianchi@email.com" && loginRequest.password === "Pwd_GiuliaBianchi_02"){
            return this.http.get<MockUser>(this.urlManager);
        } 
        return throwError(() => new Error("Credenziali non valide"));
    
    }
}


