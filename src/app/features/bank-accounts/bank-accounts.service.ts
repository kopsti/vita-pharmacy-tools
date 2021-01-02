import {Injectable} from '@angular/core';
import {CrudService} from '@utils/crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {BankAccount} from '@features/bank-accounts/bank-account.model';

@Injectable()
export class BankAccountsService extends CrudService<BankAccount> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'api/bank-accounts');
  }

}
