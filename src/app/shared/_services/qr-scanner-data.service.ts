import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class QrScannerDataService {
  defaultRow: any;

  editableRow: any;

  constructor(private http: HttpClient) {
  }

  get(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.qrScanner.get}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  post(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.common.qrScanner.post}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}
