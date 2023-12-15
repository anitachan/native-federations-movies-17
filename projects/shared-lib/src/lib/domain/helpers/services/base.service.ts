import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { OptionsRequests } from '../constants/http-headers.constants';

@Injectable()
export class BaseService {
  constructor(public http: HttpClient) {}

  baseRequest<T>(path: string, method: string, options: OptionsRequests = {}, returnError?: boolean): Observable<T> {
    (options as any).headers = { ...(options as any).headers };
    return this.http
      .request<T>(method, path, { ...options })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return returnError ? throwError(() => error) : of(null);
        })
      )
      .pipe(map((item: any) => item));
  }
}
