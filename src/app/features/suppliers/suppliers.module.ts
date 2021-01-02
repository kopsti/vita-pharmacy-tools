import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SuppliersListComponent} from '@features/suppliers/components/suppliers-list/suppliers-list.component';
import {SupplierSaveComponent} from '@features/suppliers/components/supplier-save/supplier-save.component';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [{
  path: '',
  component: SuppliersListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  providers: [SuppliersService],
  declarations: [SuppliersListComponent, SupplierSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  entryComponents: [SupplierSaveComponent]
})
export class SuppliersModule {
}
