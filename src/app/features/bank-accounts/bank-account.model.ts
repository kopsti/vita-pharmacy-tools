import {CommonProperties} from '@utils/models/common-properties.model';
import {Bank} from '@features/banks/bank.model';
import {Supplier} from '@features/suppliers/supplier.model';
import {CommonModel} from '@utils/models/common-model.model';

export class BankAccount extends CommonModel {

  iban: string;
  number: string;

  // GET
  common: CommonProperties;
  bank: Bank;
  supplier: Supplier;

  // POST
  comments: string;
  bankId: number;
  supplierId: number;

}
