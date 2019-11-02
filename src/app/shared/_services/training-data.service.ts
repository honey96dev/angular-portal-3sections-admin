import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {apis} from '@core/apis';

@Injectable({providedIn: 'root'})
export class TrainingDataService {
  constructor(private http: HttpClient) {
  }

  loadAnnualSettings(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.training.loadAnnualSettings}`, params)
      .pipe(map(res => {
        return res;
      }));
  }

  saveAnnualSettings(params) {
    return this.http.post<any>(`${environment.apiUrl}${apis.training.saveAnnualSettings}`, params)
      .pipe(map(res => {
        return res;
      }));
  }
}
