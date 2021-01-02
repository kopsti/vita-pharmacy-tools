import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {Supplier} from '@features/suppliers/supplier.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent extends ListComponent<Supplier> implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  displayedColumns = ['select', 'title', 'phoneNumber', 'email'];
  displayMap: Map<string, string> = new Map([
    ['select', 'select'],
    ['title', 'Title'],
    ['phoneNumber', 'Phone number'],
    ['email', 'email']
  ]);

  constructor(g: GenericService, s: SuppliersService, d: MatDialog) {
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
