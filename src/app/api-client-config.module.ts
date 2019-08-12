import { NgModule } from '@angular/core';
import { trackClientConfigToken, TrackClientConfig } from './shared/http-clients/track.http';

@NgModule({
  providers: [
    {
      provide: trackClientConfigToken,
      useValue: {
        urls: {
          upload: 'http://localhost:8080/api/public/track'
        }
      } as TrackClientConfig
    }
  ]
})
export class ApiClientConfigModule { }
