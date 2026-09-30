import { Component } from '@angular/core';
import { LoginJwtService } from '../service/login/login-jwt-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  imports: [],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.css',
})
export class Forbidden {

  constructor(private auth: LoginJwtService, private router: Router) { }

  ngOnInit() {
    this.auth.clearAll();
  }
  onClick() {
    this.router.navigate(['']);
  }
}
