import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackHttpClient, TrackClientConfig, trackClientConfigToken } from './track.http';
import { AuthService } from '../auth/auth.service';

describe('TrackHttpClient', () => {

  let trackClient: TrackHttpClient;
  let testController: HttpTestingController;
  let config: TrackClientConfig;
  let authServiceMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: trackClientConfigToken,
          useValue: {
            urls: {
              upload: 'EXAMPLE_TRACK_UPLOAD_URL'
            }
          }
        },
        {
          provide: AuthService,
          useValue: {}
        }
      ]
    });

    trackClient = TestBed.get(TrackHttpClient);
    testController = TestBed.get(HttpTestingController);
    config = TestBed.get(trackClientConfigToken);
    authServiceMock = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(trackClient).toBeTruthy();
  });

  describe('#upload', () => {
    it('sends a POST request to the configured endpoint', () => {
      trackClient.upload({
        contents: new File([], 'EXAMPLE_SELECTED_FILE_NAME'),
        name: 'EXAMPLE_FILE_NAME'
      })
        .subscribe();

      testController.expectOne({ method: 'POST', url: config.urls.upload });
    });

    it('passes the provided file and filename in the request payload', () => {
      trackClient.upload({
        contents: new File([], 'EXAMPLE_SELECTED_FILE_NAME'),
        name: 'EXAMPLE_FILE_NAME'
      })
        .subscribe();

      const expected = testController.expectOne('EXAMPLE_TRACK_UPLOAD_URL');
      const requestBody = expected.request.body as FormData;
      expect(requestBody.has('audio-file')).toBe(true);
      expect((requestBody.get('audio-file') as File).name).toBe('EXAMPLE_FILE_NAME');
      expect((requestBody.get('audio-file') as File).size).toEqual(0);

    });

    it('sets an authorization header containing the authService\'s idToken', () => {
      authServiceMock.idToken = 'EXAMPLE_ID_TOKEN';

      trackClient.upload({
        contents: new File([], 'EXAMPLE_SELECTED_FILE_NAME'),
        name: 'EXAMPLE_FILE_NAME'
      })
        .subscribe();

      const expected = testController.expectOne('EXAMPLE_TRACK_UPLOAD_URL');
      const headers = expected.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer EXAMPLE_ID_TOKEN');
    });
  });
});
