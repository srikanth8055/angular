import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { CanActivate } from '@angular/router';
import { LoginActivate } from './Guard/isAuthonticatGuard';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { MailComponent } from './mail/mail/mail.component';

const routes: Routes = [
  {
path:'user-details',
    component: UserDetailsComponent,
    canActivate: [LoginActivate],
  }, {
    path: 'user',
    component: UserComponent,
    canActivate: [LoginActivate],
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
{
  path:'login'
  ,component:LoginComponent
  },
  {
    path: 'mail',
    component: MailComponent
  },
{
  path: '',
  redirectTo: '',
  pathMatch:'full',
  canActivate: [LoginActivate]
  },
  {
    path: '**',
    redirectTo: 'register',
    pathMatch: 'full',
    canActivate: [LoginActivate]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
