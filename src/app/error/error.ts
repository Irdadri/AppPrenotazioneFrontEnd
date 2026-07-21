import { Component } from '@angular/core';
import { LoginJwtService } from '../service/login/login-jwt-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  constructor(private auth: LoginJwtService, private router: Router) { }
  ngOnInit() {
    this.auth.clearAll();
  }

  onClick() {
    this.router.navigate(['']);
  }
}
