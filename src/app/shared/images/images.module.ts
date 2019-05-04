import { NgModule } from '@angular/core';
import { OcarinaLinkComponent } from './ocarina-link/ocarina-link.component';
import { PlayButtonComponent } from './play-button/play-button.component';

@NgModule({
  declarations: [
    OcarinaLinkComponent,
    PlayButtonComponent,
  ],
  exports: [
    OcarinaLinkComponent,
    PlayButtonComponent,
  ]
})
export class ImagesModule { }
