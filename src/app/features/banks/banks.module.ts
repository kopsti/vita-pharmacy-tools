import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BanksListComponent} from '@features/banks/components/banks-list/banks-list.component';
import {BankSaveComponent} from '@features/banks/components/bank-save/bank-save.component';
import {BanksService} from '@features/banks/banks.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [{
  path: '',
  component: BanksListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN']}
}];

@NgModule({
  providers: [BanksService],
  declarations: [BanksListComponent, BankSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  entryComponents: [BankSaveComponent]
})

export class BanksModule {
}
