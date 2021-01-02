import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import {GenericService} from '@core/services/generic.service';
import {AuthService} from '@features/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentDate = formatDate(new Date(), 'EEEE, MMMM dd, yyyy', 'en');

  constructor(private generic: GenericService, private cdr: ChangeDetectorRef, private auth: AuthService) {
    this.auth.retrieveUserInfo().subscribe(data => {
      if (data.role === 'ROLE_SYS_ADMIN') {
        this.generic.navigateTo('/admin', null, null);
      }
    }, () => {
      this.generic.deleteCookies();
      this.generic.navigateTo('/auth/login', null, null);
    });
  }

  ngOnInit(): void {
  }

}
