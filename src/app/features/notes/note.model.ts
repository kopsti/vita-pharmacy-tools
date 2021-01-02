import {CommonModel} from '@utils/models/common-model.model';
import {CommonProperties} from '@utils/models/common-properties.model';

export class Note extends CommonModel {

  content: string;
  important: boolean;
  completed: boolean;

  // GET
  common: CommonProperties;

  // POST
  comments: string;

}
