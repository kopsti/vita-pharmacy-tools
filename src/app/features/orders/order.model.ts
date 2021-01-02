import {CommonProperties} from '@utils/models/common-properties.model';
import {CommonModel} from '@utils/models/common-model.model';
import {Supplier} from '@features/suppliers/supplier.model';
import {Customer} from '@features/customers/customer.model';

export class Order extends CommonModel {

  status: string;
  type: string;
  product: string;
  expirationTimestamp: string;

  // GET
  common: CommonProperties;
  completionTimestamp: string;
  supplier: Supplier;
  customer: Customer;

  // POST
  comments: string;
  supplierId: number;
  customerId: number;

}
