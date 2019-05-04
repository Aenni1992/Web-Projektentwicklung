import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`   //Ich hole den Token aus dem local Storage raus
        }
    });
    return next.handle(request);
  }

  constructor() { }
}
