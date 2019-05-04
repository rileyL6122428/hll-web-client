import { NgModule } from '@angular/core';
import { OcarinaLinkComponent } from './ocarina-link/ocarina-link.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { FluteSkullkidComponent } from './flute-skullkid/flute-skullkid.component';
import { PipesDekukidComponent } from './pipes-dekukid/pipes-dekukid.component';

@NgModule({
  declarations: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
    PipesDekukidComponent,
  ],
  exports: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
    PipesDekukidComponent,
  ]
})
export class ImagesModule { }
