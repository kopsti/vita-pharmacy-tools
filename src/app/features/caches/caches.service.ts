import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CachesService {

  base = environment.backend + 'management/clear-cache/';

  constructor(protected http: HttpClient) {
  }

  clearCache(q: string): Observable<any> {
    return this.http.post<any>(this.base + q, null);
  }

}
