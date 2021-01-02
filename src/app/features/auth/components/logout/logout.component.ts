import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService} from '@features/auth/auth.service';
import {GenericService} from '@core/services/generic.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(private generic: GenericService, private service: AuthService) {
  }

  sub1$: Subscription;
  subs: Subscription[] = [];

  ngOnInit() {
    if (this.generic.checkCookies()) {
      this.sub1$ = this.service.logout().subscribe(
        () => {
          this.generic.deleteCookies();
          this.generic.navigateTo('/auth/login', null, null);
        },
        e => {
          this.generic.handleError(e);
          this.generic.navigateTo('/auth/login', null, null);
        }
      );
      this.subs.push(this.sub1$);
    } else {
      this.generic.navigateTo('/auth/login', null, null);
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
