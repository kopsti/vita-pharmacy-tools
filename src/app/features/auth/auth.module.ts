import {NgModule} from '@angular/core';
import {LoginComponent} from '@features/auth/components/login/login.component';
import {LogoutComponent} from '@features/auth/components/logout/logout.component';
import {ChangePasswordComponent} from '@features/auth/components/change-password/change-password.component';
import {AuthGuard} from '@utils/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from '@features/auth/components/reset-password/reset-password.component';
import {RegistrationComponent} from '@features/auth/components/registration/registration.component';
import {SharedModule} from '@shared/shared.module';
import {AuthService} from '@features/auth/auth.service';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {showSidebar: false, showToolbar: false, public: true},
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: {showSidebar: false, showToolbar: false, roles: ['ROLE_SYS_ADMIN', 'ROLE_POWER_USER', 'ROLE_USER']}
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {showSidebar: false, showToolbar: false, public: true}
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN', 'ROLE_POWER_USER', 'ROLE_USER']}
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [AuthGuard],
    data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN', 'ROLE_POWER_USER']}
  }
];

@NgModule({
  providers: [AuthService],
  declarations: [
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
    ResetPasswordComponent,
    RegistrationComponent
  ],
  // importing MatSelectModule & MatOptionModule cause of issue in lazy loading
  imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule, MatOptionModule]
})
export class AuthModule {
}
