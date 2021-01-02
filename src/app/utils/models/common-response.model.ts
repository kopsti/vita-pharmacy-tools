import {CommonModel} from '@utils/models/common-model.model';

export class CommonResponse<M extends CommonModel> {

  code: number;
  token: string;

  // Single model
  model: M;

  // List of models
  models: M[];

}
