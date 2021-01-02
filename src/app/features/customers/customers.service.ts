import {Injectable} from '@angular/core';
import {CrudService} from '@utils/crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Customer} from '@features/customers/customer.model';

@Injectable()
export class CustomersService extends CrudService<Customer> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'api/customers');
  }

}
