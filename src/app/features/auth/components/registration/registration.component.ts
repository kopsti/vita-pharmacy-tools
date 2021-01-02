import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {GenericService} from '@core/services/generic.service';
import {AuthService} from '@features/auth/auth.service';
import {RegisterUserRequest} from '@features/auth/models/register-user-request.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  usernameField: FormControl;
  passField: FormControl;
  confirmPassField: FormControl;
  roleField: FormControl;

  sub1$: Subscription;
  subs: Subscription[] = [];
  emailSent = false;

  roles: any[] = [
    {value: 'ROLE_SYS_ADMIN', viewValue: 'Administrator'},
    {value: 'ROLE_POWER_USER', viewValue: 'Power user'},
    {value: 'ROLE_USER', viewValue: 'Service user'}
  ];

  constructor(private generic: GenericService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.usernameField = new FormControl('');
    this.passField = new FormControl('');
    this.confirmPassField = new FormControl('');
    this.roleField = new FormControl('');

    this.formGroup = new FormGroup({
        usernameField: this.usernameField,
        passField: this.passField,
        confirmPassField: this.confirmPassField,
        roleField: this.roleField
      },
      {
        validators: this.checkPasswords.bind(this)
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  doRegister(data: RegisterUserRequest) {
    this.sub1$ = this.auth.registerUser(data).subscribe(
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
      this.doRegister(new RegisterUserRequest(
        formGroup.value.usernameField,
        formGroup.value.passField,
        formGroup.value.roleField
      ));
      dir.resetForm({});
    }
  }

  checkPasswords(formGroup: FormGroup) {
    const pass = formGroup.value.passField;
    const checkPass = formGroup.value.confirmPassField;

    return ((pass === '' || checkPass === '') || (pass === checkPass)) ? null : {
      passwordMatch: {
        error: true,
        message: 'Passwords do not match'
      }
    };
  }

}
