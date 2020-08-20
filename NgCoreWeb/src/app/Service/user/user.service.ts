import { Injectable } from '@angular/core';
import { User } from '../../Models/user.model';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';
import { BehaviorSubject, observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { error } from 'protractor';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) { }
  public users: User[] = [];
  public user: User;
  endpoint: string = 'https://localhost:44371/api/';

  private userData = new BehaviorSubject<User>(this.user);
  user1 = this.userData.asObservable();

  private userobj = new BehaviorSubject<User>(this.user);
  useredit = this.userobj.asObservable();

  onEdit(user: User) {
    this.userobj.next(user);
  }

  headerDict: any = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'crossDomain': true,
    //'Access-Control - Allow - Origin': '*',
    'Authorization': `bearer ${localStorage.getItem('SecjwtToken')}`
  }


  onChange(user: User) {
    this.userData.next(user);
  }

  AddUsers(user: User) {
    return this.http.post(this.endpoint + 'user/InsertUser', user, { headers: new HttpHeaders(this.headerDict) });
  }

  GetUsers() {
    return this.http.get(this.endpoint + 'user/GetUsers', { headers: new HttpHeaders(this.headerDict) });
  }


  DeleteUser(user: User) {
    return this.http.post(this.endpoint + 'user/DeleteUser/',user,{ headers: new HttpHeaders(this.headerDict)});
  }

  updateUser(user: User) {
    return this.http.put(this.endpoint + 'user/UpdateUser', user, { headers: new HttpHeaders(this.headerDict) })
  }

}
