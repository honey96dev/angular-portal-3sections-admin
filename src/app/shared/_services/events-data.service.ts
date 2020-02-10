import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class EventsDataService {
  defaultRow: any;

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  add(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.add}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  edit(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.edit}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  delete(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.delete}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  get(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.get}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  applicants(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.applicants}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteApplicant(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.deleteApplicant}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  paid(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.paid}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  attend(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.events.attend}`, params)
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
