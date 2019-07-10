import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TrackHttpClient, TrackClientConfig, trackClientConfigToken } from './track.http';

describe('TrackHttpClient', () => {

  let trackClient: TrackHttpClient;
  let testController: HttpTestingController;
  let config: TrackClientConfig;

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
        }
      ]
    });

    trackClient = TestBed.get(TrackHttpClient);
    testController = TestBed.get(HttpTestingController);
    config = TestBed.get(trackClientConfigToken);
  });

  it('should be created', () => {
    expect(trackClient).toBeTruthy();
  });

  describe('#upload', () => {
    it('sends a POST request to the configured endpoint', () => {
      trackClient.upload({
        file: new File([], 'EXAMPLE_SELECTED_FILE_NAME'),
        filename: 'EXAMPLE_FILE_NAME'
      })
        .subscribe();

      testController.expectOne({ method: 'POST', url: config.urls.upload });
    });

    it('passes the provided file and filename in the request payload', () => {
      trackClient.upload({
        file: new File([], 'EXAMPLE_SELECTED_FILE_NAME'),
        filename: 'EXAMPLE_FILE_NAME'
      })
        .subscribe();

      const expected = testController.expectOne('EXAMPLE_TRACK_UPLOAD_URL');
      const requestBody = expected.request.body as FormData;
      expect(requestBody.has('audio-file')).toBe(true);
      expect((requestBody.get('audio-file') as File).name).toBe('EXAMPLE_FILE_NAME');
      expect((requestBody.get('audio-file') as File).size).toEqual(0);

    });
  });
});
