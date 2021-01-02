import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {OrdersService} from '@features/orders/orders.service';
import {Order} from '@features/orders/order.model';
import {GenericService} from '@core/services/generic.service';
import {CustomersService} from '@features/customers/customers.service';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {Supplier} from '@features/suppliers/supplier.model';
import {Customer} from '@features/customers/customer.model';
import {DatePipe} from '@angular/common';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {
  getStatusByCode,
  getStatusByValue,
  getTypeByCode,
  getTypeByValue,
  ORDER_STATUSES,
  ORDER_TYPES
} from '@features/orders/order-constants';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
  },
  display: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
    monthYearLabel: {year: 'numeric'}
  }
};

@Component({
  selector: 'app-order-save',
  templateUrl: './order-save.component.html',
  providers: [
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    },
    DatePipe],
  styleUrls: ['./order-save.component.css']
})
export class OrderSaveComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('supplierInput', {static: true}) supplierInput: ElementRef;
  @ViewChild('customerInput', {static: true}) customerInput: ElementRef;

  modelForm: FormGroup;
  modelDir: NgForm;
  product: FormControl;
  comments: FormControl;
  customer: FormControl;
  supplier: FormControl;
  expirationTimestamp: FormControl;
  type: FormControl;
  status: FormControl;
  newModel: Order;
  insertTimestamp: Date;
  updateTimestamp: Date;

  customers: Customer[];
  suppliers: Supplier[];

  modelCreation: boolean;

  types = ORDER_TYPES;
  statuses = ORDER_STATUSES;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  sub4$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: OrdersService, private d: MatDialog,
              private customersService: CustomersService, private suppliersService: SuppliersService) {
  }

  ngOnInit(): void {
    this.initForm(this.data == null || this.data.id == null);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.supplierInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.retrieveSuppliersWithSearch(this.supplierInput.nativeElement.value);
        })
      )
      .subscribe();

    fromEvent(this.customerInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.retrieveCustomersWithSearch(this.customerInput.nativeElement.value);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.product = new FormControl(this.data == null ? null : this.data.product);
    this.status = new FormControl(this.data == null ? getStatusByCode('INIT') : getStatusByCode(this.data.status));
    this.type = new FormControl(this.data == null ? null : getTypeByCode(this.data.type));
    this.expirationTimestamp = new FormControl(this.data == null ? null : this.data.expirationTimestamp);
    this.supplier = new FormControl(this.data == null || this.data.supplier == null ? null : this.data.supplier);
    this.customer = new FormControl(this.data == null || this.data.customer == null ? null : this.data.customer);
    this.comments = new FormControl(this.data == null || this.data.common == null ? null : this.data.common.comments);
    if (!isCreate) {
      this.insertTimestamp = new Date(this.data.common.insertTimestamp);
      this.updateTimestamp = new Date(this.data.common.updateTimestamp);
    }
    this.modelForm = new FormGroup({
      product: this.product,
      supplier: this.supplier,
      customer: this.customer,
      status: this.status,
      type: this.type,
      expirationTimestamp: this.expirationTimestamp,
      comments: this.comments,
    });

    this.retrieveCustomers();
    this.retrieveSuppliers();
  }

  modelSubmit(event: any, modelDir: FormGroupDirective, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Order();
      this.newModel.product = modelForm.value.product;
      this.newModel.expirationTimestamp = modelForm.value.expirationTimestamp;
      this.newModel.customerId = modelForm.value.customer.id;
      this.newModel.supplierId = modelForm.value.supplier.id;
      this.newModel.type = getTypeByValue(modelForm.value.type);
      this.newModel.status = getStatusByValue(modelForm.value.status);
      this.newModel.comments = modelForm.value.comments;
      if (this.modelCreation) {
        this.sub1$ = this.s.createModel(this.newModel)
          .subscribe(
            (data) => {
              this.g.handleSaveSuccess(data, this.d);
            },
            e => {
              this.g.handleSaveError(e, this.d);
            }
          );
      } else {
        this.newModel.id = this.data.id;
        this.sub1$ = this.s.updateModel(this.newModel)
          .subscribe(
            (data) => {
              this.g.handleSaveSuccess(data, this.d);
            },
            e => {
              this.g.handleSaveError(e, this.d);
            }
          );
      }
      this.subs.push(this.sub1$);
    }
  }

  deleteModel(): void {
    this.sub4$ = this.s.deleteModel(this.data.id).subscribe(
      (data) => {
        this.g.handleSaveSuccess(data, this.d);
        this.s.getModels();
      },
      e => {
        this.g.handleSaveError(e, this.d);
      }
    );
    this.subs.push(this.sub4$);
  }

  retrieveCustomersWithSearch(searchTerm: string) {
    this.retrieveCustomers('?q=' + searchTerm);
  }

  retrieveCustomers(searchTerm?: string) {
    this.sub2$ = this.customersService.getModels(searchTerm)
      .subscribe(
        data => {
          if (data.code === 1) {
            this.customers = data.models;
          }
        },
        e => {
          this.g.handleError(e);
        }
      );
    this.subs.push(this.sub2$);
  }

  retrieveSuppliersWithSearch(searchTerm: string) {
    this.retrieveSuppliers('?q=' + searchTerm);
  }

  retrieveSuppliers(searchTerm?: string) {
    this.sub3$ = this.suppliersService.getModels(searchTerm)
      .subscribe(
        data => {
          if (data.code === 1) {
            this.suppliers = data.models;
          }
        },
        e => {
          this.g.handleError(e);
        }
      );
    this.subs.push(this.sub3$);
  }

  customerDisplay(customerSelected: Customer): string {
    return customerSelected.firstName + ' ' + customerSelected.lastName;
  }

  supplierDisplay(supplierSelected: Supplier): string {
    return supplierSelected.title;
  }

}
