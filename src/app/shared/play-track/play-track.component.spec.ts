import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTrackComponent } from './play-track.component';
import { FluteSkullkidComponent } from '../images/flute-skullkid/flute-skullkid.component';
import { MockComponent } from 'ng-mocks';
import { PipesDekukidComponent } from '../images/pipes-dekukid/pipes-dekukid.component';
import { DrumsGoronLinkComponent } from '../images/drums-goron-link/drums-goron-link.component';
import { GuitarZoraLinkComponent } from '../images/guitar-zora-link/guitar-zora-link.component';
import { LyreSheikComponent } from '../images/lyre-sheik/lyre-sheik.component';
import { PlayButtonComponent } from '../images/play-button/play-button.component';

describe('PlayTrackComponent', () => {
  let component: PlayTrackComponent;
  let fixture: ComponentFixture<PlayTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(FluteSkullkidComponent),
        MockComponent(PipesDekukidComponent),
        MockComponent(DrumsGoronLinkComponent),
        MockComponent(GuitarZoraLinkComponent),
        MockComponent(LyreSheikComponent),
        MockComponent(PlayButtonComponent),
        PlayTrackComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTrackComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
