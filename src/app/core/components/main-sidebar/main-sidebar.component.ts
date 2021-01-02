import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {SidenavService} from '@core/services/sidenav.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(MatSidenav) public sidenav: MatSidenav;
  @Input() showSidebar: boolean;
  @Input() admin: boolean;

  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;

  navigation = [
    {title: 'Customers', admin: false, icon: 'person_outline', route: 'customers'},
    {title: 'Orders', admin: false, icon: 'add_shopping_cart', route: 'orders'},
    {title: 'Suppliers', admin: false, icon: 'business', route: 'suppliers'},
    {title: 'Bank Accounts', admin: false, icon: 'account_balance', route: 'bank-accounts'},
    {title: 'Notes', admin: false, icon: 'notes', route: 'notes'},
    {title: 'Overview', admin: true, icon: 'dashboard', route: 'admin'},
    {title: 'Verbals', admin: true, icon: 'notes', route: 'verbals'},
    {title: 'Banks', admin: true, icon: 'account_balance', route: 'banks'},
    {title: 'Caches', admin: true, icon: 'cleaning_services', route: 'caches'},
    {title: 'Bin', admin: false, icon: 'delete_outline', route: 'bin'}
  ];

  constructor(private sidenavService: SidenavService, private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.admin != null && changes.admin.currentValue != null) {
      if (this.admin) {
        this.navigation = this.navigation.filter(i => i.admin);
      } else {
        this.navigation = this.navigation.filter(i => !i.admin);
      }
      this.sidenavService.setSidenav(this.sidenav);
    }
  }

}
