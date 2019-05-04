import { NgModule } from '@angular/core';
import { OcarinaLinkComponent } from './ocarina-link/ocarina-link.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { FluteSkullkidComponent } from './flute-skullkid/flute-skullkid.component';

@NgModule({
  declarations: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
  ],
  exports: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
  ]
})
export class ImagesModule { }
