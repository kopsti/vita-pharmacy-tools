import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {BanksService} from '@features/banks/banks.service';
import {Bank} from '@features/banks/bank.model';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-bank-save',
  templateUrl: './bank-save.component.html',
  styleUrls: ['./bank-save.component.css']
})
export class BankSaveComponent implements OnInit, OnDestroy {

  modelForm: FormGroup;
  modelDir: NgForm;
  newModel: Bank;

  title: FormControl;

  modelCreation: boolean;

  sub1$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: BanksService, private d: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm(this.data == null || this.data.id == null);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.title = new FormControl(this.data == null ? null : this.data.title);
    this.modelForm = new FormGroup({
      title: this.title
    });
  }

  modelSubmit(event: any, modelDir: NgForm, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Bank();
      this.newModel.title = modelForm.value.title;
      this.sub1$ = this.s.createModel(this.newModel)
        .subscribe(
          (data) => {
            this.g.handleSaveSuccess(data, this.d);
          },
          e => {
            this.g.handleSaveError(e, this.d);
          }
        );
      this.subs.push(this.sub1$);
    }
  }

}
