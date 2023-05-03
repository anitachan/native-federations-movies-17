import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BaseService {
  constructor(public http: HttpClient) {}

  baseRequest<T>(
    path: string,
    method: string,
    options:
      | {
          body?: any;
          headers?: {
            [header: string]: string | string[];
          };
          params?:
            | HttpParams
            | {
                [param: string]: string | string[];
              };
        }
      | {} = {},
    returnError?: boolean
  ): Observable<T> {
    (options as any).headers = { ...(options as any).headers };
    return this.http
      .request<T>(method, path, { ...options })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return returnError ? throwError(() => error) : of(null);
        })
      )
      .pipe(map((item) => item!));
  }
}
