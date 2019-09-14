import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class ContactUsDataService {
  defaultRow: any = {};

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  list(params) {
      return this.http.post<any>(`${environment.apiUrl}${apis.common.contactUs.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
  //
  // add(params) {
  //   return this.http.post<any>(`${environment.apiUrl}${apis.common.contactUs.add}`, params)
  //     .pipe(map(res => {
  //       return res;
  //     }));
  // }
  //
  // edit(params) {
  //   return this.http.post<any>(`${environment.apiUrl}${apis.common.contactUs.edit}`, params)
  //     .pipe(map(res => {
  //       return res;
  //     }));
  // }

  delete(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.contactUs.delete}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  setEditableRow(params: any) {
    this.editableRow = params;
  }

  editableRowValue(): any {
    if (this.editableRow && this.editableRow['id']) {
      return this.editableRow;
    } else {
      return this.defaultRow;
    }
  }
}
