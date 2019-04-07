import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {}
  getCall(url: string): Observable<any> {
    return this.http.get<any>(`${AppConstants.API_BASE_URL}${url}`);
  }
  postCall(url: string, data: object, headers?: any): Observable<any> {
    return this.http.post<any>(
      `${AppConstants.API_BASE_URL}${url}`,
      data,
      headers
    );
  }
}
