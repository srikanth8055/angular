import { Injectable } from '@angular/core';
import {User} from '../../Models/user.model';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class LoginService {
public user:User;
  endpoint: string = 'https://localhost:44371/api/';

 headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
   'crossDomain': true,
   'Access-Control - Allow - Origin': '*'
}

// requestOptions = {                                                                                                                                                                                 
//  headers: new Headers(headerDict), 
//};


  constructor(private http:HttpClient ) { }

  LoginUser(user) {
    return this.http.post(this.endpoint + 'Account/ValidateUserDapper', user, { headers: new HttpHeaders('headerDict') }); 
}

  refreshToken(token: string, refreshToken: string) {
    return this.http.post(this.endpoint + 'Account/RefreshToken/', { token: token, refreshToken:refreshToken}, { headers: new HttpHeaders('headerDict') }); 
  }
}
