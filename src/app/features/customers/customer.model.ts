import {CommonProperties} from '@utils/models/common-properties.model';
import {CommonModel} from '@utils/models/common-model.model';

export class Customer extends CommonModel {

  firstName: string;
  lastName: string;
  vip: boolean;
  homePhoneNumber: string;
  mobilePhoneNumber: string;
  email: string;
  address: string;

  // GET
  common: CommonProperties;

  // POST
  comments: string;

}
