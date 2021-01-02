import {NgModule} from '@angular/core';

import {AdminComponent} from './admin.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN']}
}];

@NgModule({
  declarations: [AdminComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule {
}
