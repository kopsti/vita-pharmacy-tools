import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersListComponent} from '@features/orders/components/orders-list/orders-list.component';
import {OrderSaveComponent} from '@features/orders/components/order-save/order-save.component';
import {OrdersService} from '@features/orders/orders.service';
import {SharedModule} from '@shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {DateAdapter, MatOptionModule} from '@angular/material/core';
import {CustomersService} from '@features/customers/customers.service';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {CustomDateAdapter} from '@utils/custom-date-adapter';

const routes: Routes = [{
  path: '',
  component: OrdersListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  providers: [OrdersService, CustomersService, SuppliersService, {provide: DateAdapter, useClass: CustomDateAdapter}],
  declarations: [OrdersListComponent, OrderSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule, MatOptionModule],
  entryComponents: [OrderSaveComponent]
})
export class OrdersModule {
}
