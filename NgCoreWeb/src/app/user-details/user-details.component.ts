import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user/user.service';
import { Response} from 'selenium-webdriver/http';
import { User } from '../Models/user.model';
import * as jwt_decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { CookiesStorageService, LocalStorageService } from 'ngx-store';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private rest: UserService, private cookieservice: CookiesStorageService) { }

  users: User[] = [];
  user: User = null;

  ngOnInit() {
    this.GetUsers();
    this.rest.user1.subscribe((data) => { this.users.push(data) }, (error) => { });
  }

  GetUsers() {
    this.rest.GetUsers().subscribe((data:any) => {
      this.users = data.data;
      console.log(jwt_decode(this.cookieservice.get('SecjwtToken')));

    },
      (ServerResponse: Response) => {
        console.log(ServerResponse.status);
      });
  }

  EditUser(user: User) {
    this.rest.onEdit(user);
  }

  deleteUser(user: User){
    this.rest.DeleteUser(user).subscribe((data: {}) => {
      this.users = this.users.filter(u => u !== user);
      console.log(data);
    });
  }

  UpdateUser(user: User): void {
    this.rest.updateUser(user).subscribe((data: {}) => {
      console.log(data);
 });
  }
      
}
