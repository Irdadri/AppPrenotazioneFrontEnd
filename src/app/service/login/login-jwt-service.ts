import { inject, Service } from '@angular/core';
import { LoginRequest } from '../../model/LoginRequest';
import { UtenteService } from '../utente/utente-service';
import { UtenteDTO } from '../../model/UtenteDTO';
import { MockUser } from '../../model/MockUser';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Utente } from '../../model/Utente';
import { Token } from '../../model/Token';
import { JwtHelperService } from '@auth0/angular-jwt';


@Service()
export class LoginJwtService {

    private url = '/getTypeUser';
    private urlManager = '/getTypeManager';

    private http = inject(HttpClient);


    private realUrl = "http://localhost:9090/auth/generateToken";



    login(loginRequest: LoginRequest) {
        return this.http.post<Token>(this.realUrl, loginRequest).pipe(
            map(
                data => {
                    const helper = new JwtHelperService();
                    const decoded = helper.decodeToken(data.token);

                    sessionStorage.setItem("utente", loginRequest.email.toString());
                    sessionStorage.setItem("AuthToken", `Bearer ${data.token}`);
                    sessionStorage.setItem("userKey", decoded.userKey);
                    sessionStorage.setItem("tipoUtente", decoded.role[0].authority);
                    return data;
                }

            )
        );
    }

    getAuthToken = (): string => {
        let AuthHeader: string = "";
        var AuthToken = sessionStorage.getItem("AuthToken");

        if (AuthToken != null) {
            AuthHeader = AuthToken;
        }

        return AuthHeader;
    }

    loggedUser = (): string | null => (sessionStorage.getItem("utente")) ? sessionStorage.getItem("utente") : "";
    isLogged = (): boolean => (sessionStorage.getItem("AuthToken")) ? true : false;
    clearUser = (): void => sessionStorage.removeItem("utente");
    clearAll = (): void => sessionStorage.clear();

}


