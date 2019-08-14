import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface TrackClientConfig {
  urls: {
    upload: string;
  };
}

export const trackClientConfigToken = new InjectionToken<TrackClientConfig>('Track-Client-Config');

@Injectable({
  providedIn: 'root'
})
export class TrackHttpClient {

  constructor(
    private httpClient: HttpClient,
    @Inject(trackClientConfigToken) private config: TrackClientConfig,
    private auth: AuthService
  ) { }

  upload(params: { file: File, filename: string }): Observable<any> {
    const payload = new FormData();
    payload.append('audio-file', params.file, params.filename);
    return this.httpClient.post(
      this.config.urls.upload,
      payload,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth.idToken}`
        })
      }
    );
  }

}
