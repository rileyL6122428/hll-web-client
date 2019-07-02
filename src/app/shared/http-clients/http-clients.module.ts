import { NgModule } from '@angular/core';
import { AudioHttpClient } from './audio.http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AudioHttpClient
  ]
})
export class HllHttpClientsModule { }
