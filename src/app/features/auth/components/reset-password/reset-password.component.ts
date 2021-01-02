import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GenericService} from '@core/services/generic.service';
import {AuthService} from '@features/auth/auth.service';
import {ResetPassInitRequest} from '@features/auth/models/reset-pass-init-request.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  emailField: FormControl;

  sub1$: Subscription;
  subs: Subscription[] = [];
  emailSent = false;

  constructor(private generic: GenericService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.emailField = new FormControl('');

    this.formGroup = new FormGroup({
      emailField: this.emailField
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  doReset(data: ResetPassInitRequest) {
    this.sub1$ = this.auth.passResetInit(data).subscribe(
      response => {
        if (response.code === 1) {
          this.emailSent = true;
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
      this.doReset(new ResetPassInitRequest(
        formGroup.value.emailField
      ));
      dir.resetForm({});
    }
  }

}
