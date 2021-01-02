import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '@utils/crud/crud.service';
import {environment} from '@env/environment';
import {Verbal} from '@features/verbals/verbal.model';

@Injectable()
export class VerbalsService extends CrudService<Verbal> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'management/verbals');
  }

}
