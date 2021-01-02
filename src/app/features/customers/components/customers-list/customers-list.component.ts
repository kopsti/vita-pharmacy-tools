import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CustomersService} from '@features/customers/customers.service';
import {Customer} from '@features/customers/customer.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent extends ListComponent<Customer> implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  displayedColumns = ['select', 'firstName', 'lastName', 'email', 'mobilePhoneNumber'];
  displayMap: Map<string, string> = new Map([
    ['select', 'select'],
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['email', 'email'],
    ['mobilePhoneNumber', 'Tel. (Mobile)']
  ]);

  constructor(g: GenericService, s: CustomersService, d: MatDialog) {
    super(g, s, d);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(() => {
          super.retrieveWithSearch(this.searchInput.nativeElement.value);
        })
      )
      .subscribe();
  }

}
