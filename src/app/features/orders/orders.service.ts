import {Injectable} from '@angular/core';
import {CrudService} from '@utils/crud/crud.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Order} from '@features/orders/order.model';

@Injectable()
export class OrdersService extends CrudService<Order> {

  constructor(protected http: HttpClient) {
    super(http, environment.backend + 'api/orders');
  }

}
