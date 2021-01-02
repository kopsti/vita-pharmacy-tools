import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {BankAccountsService} from '@features/bank-accounts/bank-accounts.service';
import {Bank} from '@features/banks/bank.model';
import {BankAccount} from '@features/bank-accounts/bank-account.model';
import {GenericService} from '@core/services/generic.service';
import {Supplier} from '@features/suppliers/supplier.model';
import {BanksService} from '@features/banks/banks.service';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-bank-account-save',
  templateUrl: './bank-account-save.component.html',
  styleUrls: ['./bank-account-save.component.css']
})
export class BankAccountSaveComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('supplierInput', {static: true}) supplierInput: ElementRef;

  modelForm: FormGroup;
  modelDir: NgForm;
  iban: FormControl;
  number: FormControl;
  supplier: FormControl;
  bank: FormControl;
  newModel: BankAccount;
  insertTimestamp: Date;
  updateTimestamp: Date;

  banks: Bank[];
  suppliers: Supplier[];

  modelCreation: boolean;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: BankAccountsService, private d: MatDialog,
              private banksService: BanksService, private suppliersService: SuppliersService) {
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
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.iban = new FormControl(this.data == null ? null : this.data.iban);
    this.number = new FormControl(this.data == null ? null : this.data.number);
    this.supplier = new FormControl(this.data == null || this.data.supplier == null ? null : this.data.supplier);
    this.bank = new FormControl(this.data == null || this.data.bank == null ? null : this.data.bank.id);
    if (!isCreate) {
      this.insertTimestamp = new Date(this.data.common.insertTimestamp);
      this.updateTimestamp = new Date(this.data.common.updateTimestamp);
    }
    this.modelForm = new FormGroup({
      iban: this.iban,
      number: this.number,
      supplier: this.supplier,
      bank: this.bank
    });

    this.retrieveBanks();
    this.retrieveSuppliers();
  }

  modelSubmit(event: any, modelDir: FormGroupDirective, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new BankAccount();
      this.newModel.iban = modelForm.value.iban;
      this.newModel.number = modelForm.value.number;
      this.newModel.supplierId = modelForm.value.supplier.id;
      this.newModel.bankId = modelForm.value.bank;
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

  retrieveSuppliersWithSearch(searchTerm: string): void {
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

  retrieveBanks() {
    this.sub2$ = this.banksService.getModels()
      .subscribe(
        data => {
          if (data.code === 1) {
            this.banks = data.models;
          }
        },
        e => {
          this.g.handleError(e);
        }
      );
    this.subs.push(this.sub2$);
  }

  supplierDisplay(supplierSelected: Supplier): string {
    return supplierSelected.title;
  }

}
