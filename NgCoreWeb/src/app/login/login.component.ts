import { Component, OnInit } from '@angular/core';
import {User} from '../Models/user.model';
import {LoginService} from '../Service/Login/login.service';
import { HttpBackend } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { stringify } from 'querystring';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  constructor(private rest: LoginService, private router: Router, private cookieservice: CookiesStorageService) { }

  ngOnInit() {
  }

  Login(Data: User) {
    console.log(Data);
    this.rest.LoginUser(Data).subscribe((data: {}) => {
      var users: any = data;
      this.cookieservice.set('SecjwtToken', users.token);
      this.cookieservice.set('refreshToken', users.refreshToken)
        ;
      //localStorage.setItem('SecjwtToken', users.token);
      //localStorage.setItem('tokenExpiretime', users.expirationTokenTime);
      //localStorage.setItem('refreshToken', users.refreshToken);
        this.router.navigate(['/user']);
      
      //this.user[] = data;
    },
      (error) => {
        this.router.navigate(['/login']);

        console.log(error);
      });
  }
}
