import { Injectable, Injector } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './Service/Login/login.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private rest: LoginService) { }


  //function which will be called for all http calls
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    const updatedRequest = request.clone({
      headers: request.headers.set("Authorization", `bearer ${localStorage.getItem('SecjwtToken')}`)
    });
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", updatedRequest);
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (error.status == 401) {
            this.rest.refreshToken(this.getToken(), this.getRefreshToken()).subscribe(
              (data) => {
                var Result: any = data;
                localStorage.refreshToken = Result.refreshToken;
                localStorage.SecjwtToken = Result.token.token;
                var req = request.clone({
                  setHeaders: {
                    'Authorization': "bearer" + localStorage.getItem('SecjwtToken')
                  }
                });
                return next.handle(req);
              },
              (error) => {
                console.log(error);
                this.router.navigate(['/login']);
              }
            );
            console.log(error);
          }
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }
  getToken(): string {
    return localStorage.getItem('SecjwtToken');
  }

}
