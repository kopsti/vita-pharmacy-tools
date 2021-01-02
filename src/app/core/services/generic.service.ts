import {Inject, Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ResolveStart, Router} from '@angular/router';
import {WINDOW} from '@utils/window.providers';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CommonResponse} from '@utils/models/common-response.model';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(@Inject(WINDOW) private window: Window, private cookies: CookieService, private router: Router, private sn: MatSnackBar) {
  }

  handleError(errorResponse) {
    console.warn('Code: ' + errorResponse.status);
  }

  checkCookies() {
    return this.cookies.check('token') && this.cookies.check('agent-name');
  }

  deleteCookies() {
    this.cookies.delete('token', '/');
    this.cookies.delete('agent-name', '/');
  }

  navigateTo(url: string, next: string, returnUrl: string) {
    if (next !== null) {
      this.router.navigate([url], {
        queryParams: {next}
      }).then(() => {
      });
    } else if (returnUrl != null) {
      this.router.navigate([url], {
        queryParams: {returnUrl}
      }).then(() => {
      });
    } else {
      this.router.navigate([url]).then(() => {
      });
    }
  }

  setCookies(token: string, username: string) {
    this.cookies.set(
      'token',
      token,
      null,
      '/',
      this.window.location.hostname,
      this.window.location.hostname !== 'localhost',
      'Strict'
    );

    this.cookies.set(
      'agent-name',
      username,
      null,
      '/',
      this.window.location.hostname,
      this.window.location.hostname !== 'localhost',
      'Strict'
    );
  }

  getCookieValue(value: string) {
    return this.cookies.get(value);
  }

  getRoutingInfo(): Observable<boolean> {
    return this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      map(event => {
        let data = null;
        // @ts-ignore
        let route = event.state.root;

        while (route) {
          data = route.data || data;
          route = route.firstChild;
        }

        return data;
      }));
  }

  handleSaveSuccess(data: CommonResponse<any>, dialog ?: MatDialog): void {
    if (data.code === 1) {
      this.snack('Done');
    } else {
      this.snack('Error');
    }
    if (dialog != null) {
      dialog.closeAll();
    }
  }

  handleSaveError(e: any, dialog ?: MatDialog) {
    this.snack('Error');
    this.handleError(e);
    if (dialog != null) {
      dialog.closeAll();
    }
  }

  private snack(message: string): void {
    this.sn.open(message, '', {duration: 1000});
  }

}
