import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GenericService} from '@core/services/generic.service';
import {AuthService} from '@features/auth/auth.service';
import {ChangePassRequest} from '@features/auth/models/change-pass-request.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  passField: FormControl;
  newPassField: FormControl;
  confirmPassField: FormControl;
  hidePass = true;
  hideNew = true;
  hideConfirm = true;

  sub1$: Subscription;
  subs: Subscription[] = [];

  constructor(private generic: GenericService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.passField = new FormControl('');
    this.newPassField = new FormControl('');
    this.confirmPassField = new FormControl('');

    this.formGroup = new FormGroup({
        passField: this.passField,
        newPassField: this.newPassField,
        confirmPassField: this.confirmPassField
      },
      {
        validators: this.checkPasswords.bind(this)
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  doChangePass(data: ChangePassRequest) {
    this.sub1$ = this.auth.changePass(data).subscribe(
      response => {
        if (response.code === 1) {
          this.generic.navigateTo('/auth/login', null, null);
        }
      },
      e => {
        this.generic.handleError(e);
      }
    );
    this.subs.push(this.sub1$);
  }

  handleSubmit(event: any, dir, formGroup: FormGroup) {
    event.preventDefault();
    if (dir.submitted) {
      this.doChangePass(new ChangePassRequest(
        formGroup.value.passField,
        formGroup.value.newPassField
      ));
      dir.resetForm({});
    }
  }

  checkPasswords(formGroup: FormGroup) {
    const pass = formGroup.value.newPassField;
    const checkPass = formGroup.value.confirmPassField;

    return ((pass === '' || checkPass === '') || (pass === checkPass)) ? null : {
      passwordMatch: {
        error: true,
        message: 'Passwords do not match'
      }
    };
  }

}
