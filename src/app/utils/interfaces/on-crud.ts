import {CommonModel} from '@utils/models/common-model.model';

export interface OnCrud<M extends CommonModel> {

  saveModel(s: string, m: M, w: number, h: number): void;

  retrieveAll(q: string): void;

  retrieveModel(id: number): void;

  deleteModel(id: number): void;

}
