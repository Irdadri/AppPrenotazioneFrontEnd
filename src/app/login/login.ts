import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../model/LoginRequest';
import { LoginService } from '../service/login/login-service';

import { Router } from '@angular/router';
import { MockUser } from '../model/MockUser';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Utente } from '../model/Utente';
import { LoginJwtService } from '../service/login/login-jwt-service';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  constructor(private loginService: LoginJwtService, private router: Router) {
  }

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  }

  user: Utente | null = null;
  error = signal<boolean>(false);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  login() {
    this.loginRequest = this.loginForm.value as LoginRequest;

    this.loginService.login(this.loginRequest).subscribe({
      next: data => {
        console.log(sessionStorage.getItem('AuthToken'));
        console.log(data);
        console.log(sessionStorage.getItem("tipoUtente"));
        this.error.set(false);
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
       this.error.set(true);
      }
    });


  }
}
