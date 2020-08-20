import { BrowserModule } from '@angular/platform-browser';
import { NgModule, HostListener } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanActivate, CanActivateChild, CanLoad, CanDeactivate } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginActivate } from './Guard/isAuthonticatGuard';
import { Response, HttpClient } from 'selenium-webdriver/http';
import { UserAddComponent } from './user-add/user-add.component';
import { UserComponent } from './user/user.component';
import { MyInterceptor } from './MyIntercepter';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CookiesStorageService } from 'ngx-store';
import { MailComponent } from './mail/mail/mail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailsComponent,
    UserAddComponent,
    UserComponent,
    RegisterUserComponent,
    MailComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [LoginActivate, CookiesStorageService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
