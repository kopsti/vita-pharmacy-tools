import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {LoginRequest} from '@features/auth/models/login-request.model';
import {AuthService} from '@features/auth/auth.service';
import {GenericService} from '@core/services/generic.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  usernameField: FormControl;
  passField: FormControl;
  hide = true;

  loginErrors: any;

  sub1$: Subscription;
  subs: Subscription[] = [];

  constructor(private generic: GenericService, private auth: AuthService) {
  }

  ngOnInit() {
    if (this.generic.checkCookies()) {
      this.auth.retrieveUserInfo().subscribe(data => {
        if (data.role === 'ROLE_SYS_ADMIN') {
          this.generic.navigateTo('/admin', null, null);
        } else {
          this.generic.navigateTo('/', null, null);
        }
      }, () => {
        this.generic.deleteCookies();
        this.generic.navigateTo('/auth/login', null, null);
      });
    }

    this.usernameField = new FormControl('');
    this.passField = new FormControl('');

    this.formGroup = new FormGroup({
      usernameField: this.usernameField,
      passField: this.passField
    });
  }

  doLogin(data: LoginRequest) {
    this.sub1$ = this.auth.login(data).subscribe(
      response => {
        this.auth.saveBasicInfo(response);
      },
      error => {
        const errorKey = 'error';
        const detailKey = 'detail';
        this.loginErrors = error[errorKey][detailKey];
      }
    );
    this.subs.push(this.sub1$);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  handleSubmit(event: any, ourLoginDir, formGroup: FormGroup) {
    event.preventDefault();
    if (ourLoginDir.submitted) {
      this.doLogin(new LoginRequest(
        formGroup.value.usernameField,
        formGroup.value.passField
      ));
      ourLoginDir.resetForm({});
    }
  }

}
