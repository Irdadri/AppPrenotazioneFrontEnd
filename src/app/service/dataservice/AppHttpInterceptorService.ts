import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { urls } from './interceptor';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.handleRequests(request, next);
  }

  private handleRequests(request: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = request;

    for (const element of urls) {
      if (url.includes(element.url)) {
          console.log('Loaded from json for url: ' + url);
          return of(new HttpResponse({ status: 200, body: ((element.json) as any).default }));
      }
    }
    return next.handle(request);
  }
}