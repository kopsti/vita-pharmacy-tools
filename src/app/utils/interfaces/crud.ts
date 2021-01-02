import {Observable} from 'rxjs/Observable';
import {CommonModel} from '@utils/models/common-model.model';
import {CommonResponse} from '@utils/models/common-response.model';

export interface Crud<M extends CommonModel> {

  createModel(m: M): Observable<CommonResponse<M>>;

  getModel(id: number): Observable<CommonResponse<M>>;

  getModels(q: string): Observable<CommonResponse<M>>;

  updateModel(t: M): Observable<any>;

  deleteModel(id: number): Observable<any>;

}
