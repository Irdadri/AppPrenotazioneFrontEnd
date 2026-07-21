import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginJwtService } from '../login/login-jwt-service';

@Service()
export class Interceptor implements HttpInterceptor {



    items: any;
    //constructor(private auth: LoginJwtService) { }
    private auth = inject(LoginJwtService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log("Interceptor chiamato");
        console.log("URL:", req.url);

        var AuthToken = this.auth.getAuthToken();


        if (this.auth.loggedUser()) {
            req = req.clone({
                setHeaders: { Authorization: AuthToken }
            });
        }


        return next.handle(req);
    }

}
