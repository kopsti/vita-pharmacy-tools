import {NgModule} from '@angular/core';
import {CachesComponent} from '@features//caches/caches.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {CachesService} from '@features/caches/caches.service';

const routes: Routes = [{
  path: '',
  component: CachesComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN']}
}];

@NgModule({
  providers: [CachesService],
  declarations: [CachesComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatOptionModule, MatSelectModule]
})
export class CachesModule {
}
