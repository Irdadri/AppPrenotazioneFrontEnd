import { inject, Service } from '@angular/core';
import { LoginJwtService } from '../login/login-jwt-service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Service()
export class RouteGuardService implements CanActivate {
    token: string | null = null;
    ruoli: string[] = new Array();
    items: any;

    //constructor(private Auth: LoginJwtService, private router: Router){}
    Auth = inject(LoginJwtService);
    router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        //this.token = this.Auth.getAuthToken();

        this.token = sessionStorage.getItem('AuthToken') ? sessionStorage.getItem('AuthToken') : null;

        if (this.token != null) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(this.token);

            this.items = decodedToken['role'];


            if (!Array.isArray(this.items)) {
                this.ruoli = this.items[0].authority;
            } else {
                this.ruoli = this.items.map((r: any) => r.authority);

            }
            console.log(this.ruoli);

            if (!this.Auth.isLogged()) {

                this.router.navigate(['forbidden']);
                /*
                this.router.navigate(['login'], { queryParams: { nologged: true } });
                */
                return false;

            } else {
                let roles: string[] = new Array();
                roles = route.data['roles'];

                if (roles === null || roles.length === 0) {
                    return true;
                } else if (this.ruoli.some(r => roles.includes(r))) {
                    return true;
                } else {
                    this.router.navigate(['forbidden']);
                    return false;
                }
            }
        } else {
            this.router.navigate(['forbidden']);
            return false;
        }
    }

}
