import {NgModule} from '@angular/core';
import {NotFoundComponent} from './not-found.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '',
  component: NotFoundComponent,
  data: {showSidebar: false, showToolbar: false, roles: ['ROLE_SYS_ADMIN', 'ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class NotFoundModule {
}
