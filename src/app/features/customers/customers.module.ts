import {NgModule} from '@angular/core';
import {CustomersListComponent} from '@features/customers/components/customers-list/customers-list.component';
import {RouterModule, Routes} from '@angular/router';
import {CustomerSaveComponent} from '@features/customers/components/customer-save/customer-save.component';
import {CustomersService} from '@features/customers/customers.service';
import {SharedModule} from '@shared/shared.module';
import {OrdersService} from '@features/orders/orders.service';
import {SuppliersService} from '@features/suppliers/suppliers.service';

const routes: Routes = [{
  path: '',
  component: CustomersListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  providers: [CustomersService, OrdersService, SuppliersService],
  declarations: [CustomersListComponent, CustomerSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  entryComponents: [CustomerSaveComponent]
})
export class CustomersModule {
}
