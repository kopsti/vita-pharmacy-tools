import {Injectable} from '@angular/core';
import {CrudService} from '@utils/crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Supplier} from '@features/suppliers/supplier.model';

@Injectable()
export class SuppliersService extends CrudService<Supplier> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'api/suppliers');
  }

}
