import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class CourseDataService {
  defaultRow: any = null;

  editableRow: any;
  currentPage: Map<string, number> = new Map();

  constructor(private http: HttpClient) {
  }

  list(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.list}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  add(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.add}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  edit(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.edit}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  delete(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.delete}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  get(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.get}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  applicants(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.applicants}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  deleteApplicant(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.deleteApplicant}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  paid(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.paid}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  attend(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.courses.attend}`, params)
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

  setCurrentPage(scope: string, page: number) {
    this.currentPage.set(scope, page);
  }

  currentPageValue(scope): number {
    const page = this.currentPage.get(scope);
    return page ? page : 1;
  }
}
