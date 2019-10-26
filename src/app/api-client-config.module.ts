import { NgModule } from '@angular/core';
// import { trackClientConfigToken, TrackClientConfig } from './shared/http-clients/track.http';
import { trackClientConfigToken, TrackClientConfig } from 'hll-shared-client';
import { environment } from 'src/environments/environment';

@NgModule({
  providers: [
    {
      provide: trackClientConfigToken,
      useValue: {
        urls: {
          upload: 'http://localhost:8080/api/private/track',
          getAllForUser: environment.API.TRACKS.GET_ALL_FOR_USER,
          delete: (trackId: string) => `http://localhost:8080/api/private/track/${trackId}`
        }
      } as TrackClientConfig
    }
  ]
})
export class ApiClientConfigModule { }
