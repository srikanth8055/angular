import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Injectable } from '@angular/core';
import { Response } from 'selenium-webdriver/http';
import { CookiesStorageService } from 'ngx-store';

 
@Injectable()
export class LoginActivate implements CanActivate {
  constructor(private route: Router, private cookieservice: CookiesStorageService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    var data: any = this.cookieservice.get('SecjwtToken');
    var reftoken = this.cookieservice.get('refreshToken');


    if (data && reftoken) {
      return true;
    }
    else {
      this.route.navigate(['login']);
      return false;
    }

  }

}
