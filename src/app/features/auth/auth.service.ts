import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {LoginRequest} from '@features/auth/models/login-request.model';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChangePassRequest} from '@features/auth/models/change-pass-request.model';
import {environment} from '@env/environment';
import {LoginResponse} from '@features/auth/models/login-response.model';
import {RegisterUserRequest} from '@features/auth/models/register-user-request.model';
import {GenericService} from '@core/services/generic.service';
import {ResetPassInitRequest} from '@features/auth/models/reset-pass-init-request.model';

@Injectable()
export class AuthService {

  private baseUrl = environment.backend;
  private nextUrl: string;

  constructor(private generic: GenericService, private http: HttpClient, private route: ActivatedRoute
  ) {
  }

  getNextUrl() {
    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.nextUrl = params.returnUrl;
        if (this.nextUrl === 'auth/logout') {
          this.nextUrl = null;
        }
      }
    });
    return this.nextUrl;
  }

  login(data: LoginRequest): Observable<any> {
    const endpoint = `${this.baseUrl}public/access/login`;
    return this.http.post(endpoint, data);
  }

  saveBasicInfo(response: LoginResponse) {

    this.generic.setCookies(response.token, response.username);

    const nextUrl = this.getNextUrl();
    if (nextUrl) {
      this.generic.navigateTo(nextUrl, null, null);
    } else {
      if (response.role === 'ROLE_SYS_ADMIN') {
        this.generic.navigateTo('/admin', null, null);
      } else {
        this.generic.navigateTo('/', null, null);
      }
    }
  }

  logout(): Observable<any> {
    const endpoint = `${this.baseUrl}access/logout`;
    return this.http.post(endpoint, {});
  }

  changePass(data: ChangePassRequest): Observable<any> {
    const endpoint = `${this.baseUrl}access/password/change`;
    return this.http.post(endpoint, data);
  }

  registerUser(data: RegisterUserRequest): Observable<any> {
    const endpoint = `${this.baseUrl}access/register`;
    return this.http.post(endpoint, data);
  }

  retrieveUserInfo(): Observable<any> {
    const endpoint = `${this.baseUrl}access/user-info`;
    return this.http.get(endpoint);
  }

  passResetInit(data: ResetPassInitRequest): Observable<any> {
    const endpoint = `${this.baseUrl}public/access/password/reset/init`;
    return this.http.post(endpoint, data);
  }

}
