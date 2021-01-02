import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {GenericService} from '@core/services/generic.service';
import {AuthService} from '@features/auth/auth.service';
import {SidenavService} from '@core/services/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(MatSidenav) public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  eligibleRole: boolean;
  showToolbar: boolean;
  showSidebar: boolean;
  admin: boolean;
  adminOrPowerUser: boolean;
  user: string;
  eligibleRoles: string [] = [];
  selectedItems: any[];

  constructor(private generic: GenericService, private auth: AuthService, private sidenavService: SidenavService,
              private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);

    this.generic.getRoutingInfo().subscribe(routeInfo => {
      // @ts-ignore
      this.showToolbar = routeInfo.showToolbar;
      // @ts-ignore
      this.showSidebar = routeInfo.showSidebar;
      // @ts-ignore
      if (!routeInfo.public) {
        if (this.generic.checkCookies()) {
          // @ts-ignore
          this.eligibleRoles = routeInfo.roles;
          this.auth.retrieveUserInfo().subscribe(user => {
            this.user = user.username.replace(/@.*/, '');
            this.eligibleRole = this.eligibleRoles.includes(user.role);
            this.admin = user.role === 'ROLE_SYS_ADMIN';
            this.adminOrPowerUser = (this.admin || user.role === 'ROLE_POWER_USER');
            if (!this.eligibleRole) {
              this.generic.navigateTo('/404', null, null);
            }
          }, () => {
            this.generic.deleteCookies();
            this.generic.navigateTo('/auth/login', null, null);
          });
        } else {
          this.generic.navigateTo('/auth/login', null, null);
        }
      }
    });
  }

  toggleSidebar() {
    this.sidenavService.toggle();
  }

  refresh() {
    // todo better reload router, not whole window
    window.location.reload();
  }

  deleteSelected() {
  }

  selectAll() {
  }

  deselectAll() {
    // for (let i of this.selectedItems) {
    //   i.selected = false;
    // }
    this.selectedItems = [];
  }

}
