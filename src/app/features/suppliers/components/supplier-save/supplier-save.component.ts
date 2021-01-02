import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {Supplier} from '@features/suppliers/supplier.model';
import {GenericService} from '@core/services/generic.service';

@Component({
  selector: 'app-supplier-save',
  templateUrl: './supplier-save.component.html',
  styleUrls: ['./supplier-save.component.css']
})
export class SupplierSaveComponent implements OnInit, OnDestroy {

  modelForm: FormGroup;
  modelDir: NgForm;
  title: FormControl;
  description: FormControl;
  phoneNumber: FormControl;
  email: FormControl;
  taxId: FormControl;
  taxAuthority: FormControl;
  comments: FormControl;
  newModel: Supplier;
  insertTimestamp: Date;
  updateTimestamp: Date;

  modelCreation: boolean;

  sub1$: Subscription;
  sub2$: Subscription;
  sub3$: Subscription;
  subs: Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private g: GenericService, private s: SuppliersService, private d: MatDialog) {
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
    this.description = new FormControl(this.data == null ? null : this.data.description);
    this.phoneNumber = new FormControl(this.data == null ? null : this.data.phoneNumber);
    this.email = new FormControl(this.data == null ? null : this.data.email);
    this.taxId = new FormControl(this.data == null ? null : this.data.taxId);
    this.taxAuthority = new FormControl(this.data == null ? null : this.data.taxAuthority);
    this.comments = new FormControl(this.data == null || this.data.common == null ? null : this.data.common.comments);
    if (!isCreate) {
      this.insertTimestamp = new Date(this.data.common.insertTimestamp);
      this.updateTimestamp = new Date(this.data.common.updateTimestamp);
    }
    this.modelForm = new FormGroup({
      title: this.title,
      description: this.description,
      phoneNumber: this.phoneNumber,
      email: this.email,
      taxId: this.taxId,
      taxAuthority: this.taxAuthority,
      comments: this.comments
    });
  }

  modelSubmit(event: any, modelDir: FormGroupDirective, modelForm: FormGroup) {
    event.preventDefault();
    if (modelDir.submitted) {
      this.newModel = new Supplier();
      this.newModel.title = modelForm.value.title;
      this.newModel.description = modelForm.value.description;
      this.newModel.phoneNumber = modelForm.value.phoneNumber;
      this.newModel.email = modelForm.value.email;
      this.newModel.taxId = modelForm.value.taxId;
      this.newModel.taxAuthority = modelForm.value.taxAuthority;
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

}
