import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class HomeModule {
}
