import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VerbalsListComponent} from '@features/verbals/components/verbals-list/verbals-list.component';
import {VerbalSaveComponent} from '@features/verbals/components/verbal-save/verbal-save.component';
import {VerbalsService} from '@features/verbals/verbals.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [{
  path: '',
  component: VerbalsListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_SYS_ADMIN']}
}];

@NgModule({
  providers: [VerbalsService],
  declarations: [VerbalsListComponent, VerbalSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  entryComponents: [VerbalSaveComponent]
})
export class VerbalsModule {
}
