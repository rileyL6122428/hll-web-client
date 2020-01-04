import { NgModule } from '@angular/core';
import { trackClientConfigToken, TrackClientConfig } from 'hll-shared-client';
import { environment } from 'src/environments/environment';

@NgModule({
  providers: [
    {
      provide: trackClientConfigToken,
      useValue: {
        urls: {
          upload: `http://${environment.apiHost}/api/private/track`,
          getAllForUser: environment.API.TRACKS.GET_ALL_FOR_USER,
          delete(trackId: string) {
            return `http://${environment.apiHost}/api/private/track/${trackId}`;
          }
        }
      } as TrackClientConfig
    }
  ]
})
export class ApiClientConfigModule { }
