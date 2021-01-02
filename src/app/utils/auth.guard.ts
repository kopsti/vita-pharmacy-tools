import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {GenericService} from '@core/services/generic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private generic: GenericService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.generic.checkCookies()) {
      return true;
    }

    this.generic.deleteCookies();
    this.generic.navigateTo('/auth/login', null, state.url);

    return false;
  }

}
