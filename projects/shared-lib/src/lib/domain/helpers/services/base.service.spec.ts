import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_METHODS } from '../constants/http-headers.constants';
import { BaseService } from './base.service';

describe('BaseService', () => {
  let service: BaseService;
  let httpCtrl: HttpTestingController;

  const headers = {
    authorization: 'Bearer 123',
    versions: ['1.1', '1.2'],
  };

  const params = {
    movie: 'movieId',
    genres: ['terror', 'drama'],
  };

  const options = {
    body: 'movieId',
    headers,
    params,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BaseService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  Object.keys(HTTP_METHODS).forEach(method => {
    it(`should set headers, parameters and body with ${method}`, done => {
      const response = `mock${method}Response`;
      const subscription = service.baseRequest('path', method, options).subscribe(res => {
        expect(res).toEqual(response);
        done();
      });

      const mockHttp = httpCtrl.expectOne(`path?movie=${params.movie}&genres=${params.genres[0]}&genres=${params.genres[1]}`);
      const httpRequest = mockHttp.request;

      expect(httpRequest.method).toEqual(method);
      expect(httpRequest.headers.get('authorization')).toEqual(headers.authorization);
      expect(httpRequest.headers.get('versions')).toEqual(headers.versions[0]);
      expect(httpRequest.body).toEqual('movieId');

      mockHttp.flush(response);
      subscription.unsubscribe();
    });
  });

  Object.keys(HTTP_METHODS).forEach(method => {
    it(`should set headers, parameters, body with ${method} and return null when returnError is false`, done => {
      const response = `mock${method}Response`;
      const subscription = service.baseRequest('path', method, options, false).subscribe(res => {
        expect(res).toEqual(null);
        done();
      });

      const mockHttp = httpCtrl.expectOne(`path?movie=${params.movie}&genres=${params.genres[0]}&genres=${params.genres[1]}`);
      const httpRequest = mockHttp.request;

      expect(httpRequest.method).toEqual(method);
      expect(httpRequest.headers.get('authorization')).toEqual(headers.authorization);
      expect(httpRequest.headers.get('versions')).toEqual(headers.versions[0]);
      expect(httpRequest.body).toEqual('movieId');

      mockHttp.flush(response, {
        status: 400,
        statusText: `Error ${method}`,
      });

      subscription.unsubscribe();
    });
  });

  Object.keys(HTTP_METHODS).forEach(method => {
    const errorResponse = {
      status: 400,
      statusText: `Error ${method}`,
    };
    it(`should set headers, parameters, body with ${method} and return null when returnError is true`, done => {
      const response = `mock${method}Response`;
      const subscription = service.baseRequest('path', method, options, true).subscribe({
        error: error => {
          expect(error.status).toBe(errorResponse.status);
          expect(error.statusText).toBe(errorResponse.statusText);
          done();
        },
      });

      const mockHttp = httpCtrl.expectOne(`path?movie=${params.movie}&genres=${params.genres[0]}&genres=${params.genres[1]}`);
      const httpRequest = mockHttp.request;

      expect(httpRequest.method).toEqual(method);
      expect(httpRequest.headers.get('authorization')).toEqual(headers.authorization);
      expect(httpRequest.headers.get('versions')).toEqual(headers.versions[0]);
      expect(httpRequest.body).toEqual('movieId');

      mockHttp.flush(response, errorResponse);
      subscription.unsubscribe();
    });
  });
});
