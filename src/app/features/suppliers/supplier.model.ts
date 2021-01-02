import {CommonProperties} from '@utils/models/common-properties.model';
import {CommonModel} from '@utils/models/common-model.model';

export class Supplier extends CommonModel {

  title: string;
  description: string;
  phoneNumber: string;
  email: string;
  taxId: string;
  taxAuthority: string;

  // GET
  common: CommonProperties;

  // POST
  comments: string;

}
