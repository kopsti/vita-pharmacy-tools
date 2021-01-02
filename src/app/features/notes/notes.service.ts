import {Injectable} from '@angular/core';
import {CrudService} from '@utils/crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Note} from '@features/notes/note.model';

@Injectable()
export class NotesService extends CrudService<Note> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'api/notes');
  }

}
