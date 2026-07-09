import { Component, EventEmitter, Output } from '@angular/core';
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
import { Toolbar } from '../toolbar/toolbar';
import { Utente } from '../model/Utente';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  constructor(private loginService: LoginService, private router: Router) {
  }

  loginRequest: LoginRequest = {
    email: '',
    password: ''
  }

  //user = {} as MockUser;
  user: Utente | null = null;
  error = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  login() {
    this.loginRequest = this.loginForm.value as LoginRequest;
    /*
    this.loginService.matchUser(this.loginRequest).subscribe(user => this.user = user);
    console.log(this.user);
    if(this.user){
      this.router.navigate(['dashboard/']);
      sessionStorage.setItem("tipoUtente", this.user.tipoUtente.toString());
      //sessionStorage.setItem("tipoUtente", "manager");
      sessionStorage.setItem("userId", this.user.id.toString());
      //sessionStorage.setItem("userId", "2");
      
    } else {
      this.error = true;
    }
      */

    this.loginService.login(this.loginRequest).subscribe(utente => {
      this.user = utente;
      console.log(this.user);
      if (this.user) {
        this.router.navigate(['dashboard/']);
        sessionStorage.setItem("tipoUtente", this.user.tipoUtente.toString());
        //sessionStorage.setItem("tipoUtente", "manager");
        sessionStorage.setItem("userId", this.user.id.toString());
        //sessionStorage.setItem("userId", "2");
        sessionStorage.setItem("user", JSON.stringify(this.user));
      } else {
        this.error = true;
      }
    })


  }
}
