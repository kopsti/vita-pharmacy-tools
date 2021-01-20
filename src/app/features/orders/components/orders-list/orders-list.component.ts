import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {OrdersService} from '@features/orders/orders.service';
import {Order} from '@features/orders/order.model';
import {ListComponent} from '@utils/crud/list.component';
import {GenericService} from '@core/services/generic.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {getStatusByCode} from '@features/orders/order-constants';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent extends ListComponent<Order> implements OnInit, AfterViewInit {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  displayedColumns = ['select', 'product', 'customer', 'customer_phone', 'status', 'expirationTimestamp'];
  displayMap: Map<string, string> = new Map([
    ['select', 'select'],
    ['product', 'Product'],
    ['customer', 'Customer'],
    ['customer_phone', 'Phone Number'],
    ['status', 'Status'],
    ['expirationTimestamp', 'Due date']
  ]);

  currentDate: Date;

  constructor(g: GenericService, s: OrdersService, d: MatDialog) {
    super(g, s, d);
  }

  ngOnInit(): void {
    super.ngOnInit();
    const d = new Date();
    this.currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
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

  getDateFormat(date: any) {
    return date === undefined ? null : new Date(date).toDateString();
  }

  getStatusValue(code: string): string {
    return getStatusByCode(code);
  }

  orderCompleted(order: Order): boolean {
    return order.status === 'COMPLETED';
  }

  orderExpiring(order: Order): boolean {
    const expirationDate = new Date(order.expirationTimestamp);
    return (expirationDate.getTime() - this.currentDate.getTime() <= 2 * 86400000)
      && order.status !== 'COMPLETED' && order.status !== 'FAILED' && order.status !== 'CANCELED';
  }

  orderExpired(order: Order): boolean {
    const expirationDate = new Date(order.expirationTimestamp);
    return expirationDate.getTime() < this.currentDate.getTime()
      && order.status !== 'COMPLETED' && order.status !== 'FAILED' && order.status !== 'CANCELED';
  }

}
