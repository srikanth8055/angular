import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  islogedin: boolean;

  constructor(private router: Router) {
    var token: string = localStorage.getItem('SecjwtToken');
    var reftoken: string = localStorage.getItem('refreshToken');
    if (token && reftoken) {
      this.islogedin = true;
    }
    else {
      this.islogedin = false;
    }
  }

  ngOnInit() {
    
  }

  logOut() {
    localStorage.setItem('SecjwtToken','');
    localStorage.setItem('refreshToken', '');
    //this.router.navigate(["/login"]);
  }

 

  title = 'NgCoreWeb';
}
