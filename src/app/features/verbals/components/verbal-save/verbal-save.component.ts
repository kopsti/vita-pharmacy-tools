import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {VerbalsService} from '@features/verbals/verbals.service';
import {Verbal} from '@features/verbals/verbal.model';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-verbal-save',
  templateUrl: './verbal-save.component.html',
  styleUrls: ['./verbal-save.component.css']
})
export class VerbalSaveComponent implements OnInit, OnDestroy {

  modelForm: FormGroup;
  modelDir: NgForm;
  newModel: Verbal;

  key: FormControl;
  value: FormControl;

  modelCreation: boolean;

  sub1$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: VerbalsService, private d: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm(this.data == null || this.data.id == null);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  initForm(isCreate: boolean) {
    this.modelCreation = isCreate;
    this.key = new FormControl(this.data == null ? null : this.data.key);
    this.value = new FormControl(this.data == null ? null : this.data.value);
    this.modelForm = new FormGroup({
      key: this.key,
      value: this.value
    });
  }

  modelSubmit(event: any, modelDir: NgForm, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Verbal();
      this.newModel.key = modelForm.value.key;
      this.newModel.value = modelForm.value.value;
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
