import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class AboutUsDataService {
  defaultRow: any = {};

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  load(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.aboutUs.load}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  save(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.aboutUs.save}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}
