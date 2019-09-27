import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Track } from '../track-player/track.api';

export interface TrackClientConfig {
  urls: {
    upload: string;
    getAllForUser: string;
    delete: (trackId: string) => string;
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

  upload(params: { name: string, contents: File }): Observable<any> {
    const payload = new FormData();
    payload.append('audio-file', params.contents, params.name);
    return this.httpClient.post(
      this.config.urls.upload,
      payload,
      {
        headers: this.protectedEndpointHeaders
      }
    );
  }

  getTracks(params: { userId: string }): Observable<any> {
    const url = this.config.urls.getAllForUser;
    const options = {
      params: {
        'artist-id': params.userId
      }
    };

    return this.httpClient.get(url, options);
  }

  delete(track: Track): Observable<any> {
    return this.httpClient.delete(
      this.config.urls.delete(track.id),
      {
        headers: this.protectedEndpointHeaders
      }
    )
      .pipe(
        map((response: any) => response.track)
      );
  }

  private get protectedEndpointHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.idToken}`
    });
  }

}
