import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '@utils/crud/crud.service';
import {environment} from '@env/environment';
import {Bank} from '@features/banks/bank.model';

@Injectable()
export class BanksService extends CrudService<Bank> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'management/banks');
  }

}
