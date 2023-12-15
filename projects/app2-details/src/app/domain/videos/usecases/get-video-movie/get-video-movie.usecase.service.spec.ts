import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { GetVideosMovieGateway } from '../../gateway/get-videos-movie.gateway';
import { GetVideoMovieUsecaseService } from './get-video-movie.usecase.service';

describe('GetVideoMovieUsecaseService', () => {
  let useCase: GetVideoMovieUsecaseService;

  const mockBody: any = {
    movieId: '123456',
  };

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

  const mockGetVideosMovieGateway = {
    getVideosMovie: jest.fn(() => of(mockVideoMovieData)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetVideoMovieUsecaseService, { provide: GetVideosMovieGateway, useValue: mockGetVideosMovieGateway }],
    });
    useCase = TestBed.inject(GetVideoMovieUsecaseService);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return the correct data', (done) => {
    useCase.invoke(mockBody).subscribe((data) => {
      expect(data).toEqual(mockVideoMovieData);
      done();
    });
  });

  it('should call invoke and return error', (done) => {
    const error = {
      status: 404,
    };
    jest.spyOn(mockGetVideosMovieGateway, 'getVideosMovie').mockImplementationOnce(() => throwError(() => error));

    useCase.invoke(mockBody).subscribe((resp) => {
      expect(resp).toEqual(error);
      done();
    });
  });
});
