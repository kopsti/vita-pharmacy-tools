import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Crud} from '@utils/interfaces/crud';
import {CommonModel} from '@utils/models/common-model.model';
import {CommonResponse} from '@utils/models/common-response.model';
import {Tools} from '@utils/tools';

export abstract class CrudService<M extends CommonModel> implements Crud<M> {

  protected constructor(protected http: HttpClient, protected base: string
  ) {
  }

  createModel(m: M): Observable<any> {
    return this.http.post<M>(this.base, m);
  }

  getModel(id: number): Observable<CommonResponse<M>> {
    return this.http.get<CommonResponse<M>>(this.base + '/' + id);
  }

  getModels(q ?: string): Observable<CommonResponse<M>> {
    return this.http.get<CommonResponse<M>>(this.base + Tools.stringOrEmpty(q));
  }

  updateModel(t: M): Observable<any> {
    return this.http.put(this.base + '/' + t.id, t);
  }

  deleteModel(id: number): Observable<any> {
    return this.http.delete(this.base + '/' + id);
  }

}
