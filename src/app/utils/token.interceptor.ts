import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GenericService} from '@core/services/generic.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private generic: GenericService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.generic.getCookieValue('token');
    const username = this.generic.getCookieValue('agent-name');
    const currentUrl = this.router.url;
    if (currentUrl !== 'auth/login' && token) {
      const headers = request.headers.set('Authorization', `Bearer ${token}`).set('Agent', username);
      request = request.clone({headers});
    }

    return next.handle(request).pipe(
      tap(() => {
        },
        e => {
          if (e.status === 40) {
            if (currentUrl !== 'auth/login') {
              this.generic.deleteCookies();
              this.generic.navigateTo('/auth/login', currentUrl, null);
            }
          } else if (e.status === 403) {
            this.generic.navigateTo('/404', null, null);
          }
        }
      ));
  }

}
