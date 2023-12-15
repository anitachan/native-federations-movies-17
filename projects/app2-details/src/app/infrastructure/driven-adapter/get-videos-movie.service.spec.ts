import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { GetVideosMovieService } from './get-videos-movie.service';

const mockVideoMovieData = {
  movieVideo: {
    id: 274,
    results: [
      {
        id: '5a859a309251410aae02170c',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: '8xWbc_kFus4',
        name: 'Jodie Foster On Hannibal Lecter',
        site: 'YouTube',
        size: 360,
        type: 'Featurette',
      },
      {
        id: '5b5b3a8e0e0a26740d00bc0a',
        iso_639_1: 'en',
        iso_3166_1: 'US',
        key: 'W6Mm8Sbe__o',
        name: 'The Silence of the Lambs Official Trailer #1 - Anthony Hopkins Movie (1991) HD',
        site: 'YouTube',
        size: 720,
        type: 'Trailer',
      },
    ],
  },
  movieVideoUrl: [
    {
      url: 'https://www.youtube.com/embed/8xWbc_kFus4',
      name: 'Jodie Foster On Hannibal Lecter',
    },
    {
      url: 'https://www.youtube.com/embed/W6Mm8Sbe__o',
      name: 'The Silence of the Lambs Official Trailer #1 - Anthony Hopkins Movie (1991) HD',
    },
  ],
};

describe('CustomGetVideosMovieService', () => {
  let service: GetVideosMovieService;
  let httpCtrl: HttpTestingController;
  const tmdbUrl = environment.tmdbUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GetVideosMovieService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get and return movie videos with the movie id', (done) => {
    const movieId = 'movieId';
    const url = `${tmdbUrl}movie/${movieId}/videos?api_key=${service.params.api_key}&page=${service.params.page}`;
    const subscription = service.getVideosMovie(movieId).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockVideoMovieData);
      done();
    });

    const mockHttp = httpCtrl.expectOne(url);
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual('GET');

    mockHttp.flush(mockVideoMovieData);
    subscription.unsubscribe();
  });
});
