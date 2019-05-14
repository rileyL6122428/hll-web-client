import { NgModule } from '@angular/core';
import { OcarinaLinkComponent } from './ocarina-link/ocarina-link.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { FluteSkullkidComponent } from './flute-skullkid/flute-skullkid.component';
import { PipesDekukidComponent } from './pipes-dekukid/pipes-dekukid.component';
import { DrumsGoronLinkComponent } from './drums-goron-link/drums-goron-link.component';
import { GuitarZoraLinkComponent } from './guitar-zora-link/guitar-zora-link.component';
import { LyreSheikComponent } from './lyre-sheik/lyre-sheik.component';
import { MaskSalesmanComponent } from './mask-salesman/mask-salesman.component';

@NgModule({
  declarations: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
    PipesDekukidComponent,
    DrumsGoronLinkComponent,
    GuitarZoraLinkComponent,
    LyreSheikComponent,
    MaskSalesmanComponent,
  ],
  exports: [
    OcarinaLinkComponent,
    PlayButtonComponent,
    FluteSkullkidComponent,
    PipesDekukidComponent,
    DrumsGoronLinkComponent,
    GuitarZoraLinkComponent,
    LyreSheikComponent,
    MaskSalesmanComponent,
  ]
})
export class ImagesModule { }
