import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateParserInterceptor implements HttpInterceptor {
  private dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === 4) {
          // HttpResponse
          event = event.clone({
            body: this.convertDates(event.body),
          });
        }
        return event;
      })
    );
  }

  private convertDates(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === 'string' && this.dateRegex.test(obj)) {
      return new Date(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertDates(item));
    }

    if (typeof obj === 'object') {
      const converted: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          converted[key] = this.convertDates(obj[key]);
        }
      }
      return converted;
    }

    return obj;
  }
}
