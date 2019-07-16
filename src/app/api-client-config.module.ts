import { NgModule } from '@angular/core';
import { trackClientConfigToken, TrackClientConfig } from './shared/http-clients/track.http';

@NgModule({
  providers: [
    {
      provide: trackClientConfigToken,
      useValue: {
        urls: {
          upload: ''
        }
      } as TrackClientConfig
    }
  ]
})
export class ApiClientConfigModule { }
