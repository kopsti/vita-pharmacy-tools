import {NgModule} from '@angular/core';
import {NotesListComponent} from '@features/notes/components/notes-list/notes-list.component';
import {RouterModule, Routes} from '@angular/router';
import {NoteSaveComponent} from '@features/notes/components/note-save/note-save.component';
import {NotesService} from '@features/notes/notes.service';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [{
  path: '',
  component: NotesListComponent,
  data: {showSidebar: true, showToolbar: true, roles: ['ROLE_POWER_USER', 'ROLE_USER']}
}];

@NgModule({
  providers: [NotesService],
  declarations: [NotesListComponent, NoteSaveComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  entryComponents: [NoteSaveComponent]

})
export class NotesModule {
}
