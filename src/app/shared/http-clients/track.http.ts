import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TrackClientConfig {
  urls: {
    upload: string;
  };
}

export const trackClientConfigToken = new InjectionToken<TrackClientConfig>('');

@Injectable({
  providedIn: 'root'
})
export class TrackHttpClient {

  constructor(
    private httpClient: HttpClient,
    @Inject(trackClientConfigToken) private config: TrackClientConfig
  ) { }

  upload(params: { file: File, filename: string }): Observable<any> {
    const payload = new FormData();
    payload.append('audio-file', params.file, params.filename);
    return this.httpClient.post(this.config.urls.upload, payload);
  }

}
