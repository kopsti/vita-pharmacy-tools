import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {CustomersService} from '@features/customers/customers.service';
import {Customer} from '@features/customers/customer.model';
import {GenericService} from '@core/services/generic.service';
import {Order} from '@features/orders/order.model';
import {OrderSaveComponent} from '@features/orders/components/order-save/order-save.component';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit, OnDestroy {

  modelForm: FormGroup;
  modelDir: NgForm;
  firstName: FormControl;
  lastName: FormControl;
  vip: FormControl;
  homePhoneNumber: FormControl;
  mobilePhoneNumber: FormControl;
  email: FormControl;
  address: FormControl;
  comments: FormControl;
  newModel: Customer;
  newOrder: Order;
  insertTimestamp: Date;
  updateTimestamp: Date;

  modelCreation: boolean;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: CustomersService, private d: MatDialog,
              private d1: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm(this.data == null || this.data.id == null);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.firstName = new FormControl(this.data == null ? null : this.data.firstName);
    this.lastName = new FormControl(this.data == null ? null : this.data.lastName);
    this.vip = new FormControl(this.data == null ? false : this.data.vip);
    this.homePhoneNumber = new FormControl(this.data == null ? null : this.data.homePhoneNumber);
    this.mobilePhoneNumber = new FormControl(this.data == null ? null : this.data.mobilePhoneNumber);
    this.email = new FormControl(this.data == null ? null : this.data.email);
    this.address = new FormControl(this.data == null ? null : this.data.address);
    this.comments = new FormControl(this.data == null || this.data.common == null ? null : this.data.common.comments);
    if (!isCreate) {
      this.insertTimestamp = new Date(this.data.common.insertTimestamp);
      this.updateTimestamp = new Date(this.data.common.updateTimestamp);
    }
    this.modelForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      vip: this.vip,
      email: this.email,
      address: this.address,
      homePhoneNumber: this.homePhoneNumber,
      mobilePhoneNumber: this.mobilePhoneNumber,
      comments: this.comments
    });
  }

  modelSubmit(event: any, modelDir: FormGroupDirective, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Customer();
      this.newModel.firstName = modelForm.value.firstName;
      this.newModel.lastName = modelForm.value.lastName;
      this.newModel.vip = modelForm.value.vip;
      this.newModel.email = modelForm.value.email;
      this.newModel.homePhoneNumber = modelForm.value.homePhoneNumber;
      this.newModel.mobilePhoneNumber = modelForm.value.mobilePhoneNumber;
      this.newModel.address = modelForm.value.address;
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
    this.sub3$ = this.s.deleteModel(this.data.id).subscribe(
      (data) => {
        this.g.handleSaveSuccess(data, this.d);
        this.s.getModels();
      },
      e => {
        this.g.handleSaveError(e, this.d);
      }
    );
    this.subs.push(this.sub3$);
  }

  addOrder() {
    this.d.closeAll();
    this.newOrder = new Order();
    this.newOrder.customer = this.data;
    this.d1.open(OrderSaveComponent, {data: this.newOrder, height: '60%', width: '65%'});
  }

}
