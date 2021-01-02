import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankAccountsListComponent} from '@features/bank-accounts/components/bank-accounts-list/bank-accounts-list.component';
import {BankAccountSaveComponent} from '@features/bank-accounts/components/bank-account-save/bank-account-save.component';
import {BankAccountsService} from '@features/bank-accounts/bank-accounts.service';
import {SharedModule} from '@shared/shared.module';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {SuppliersService} from '@features/suppliers/suppliers.service';
import {BanksService} from '@features/banks/banks.service';

const routes: Routes = [{
  path: '',
  component: BankAccountsListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  providers: [BankAccountsService, SuppliersService, BanksService],
  declarations: [BankAccountsListComponent, BankAccountSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatSelectModule, MatOptionModule],
  entryComponents: [BankAccountSaveComponent]
})
export class BankAccountsModule {
}
