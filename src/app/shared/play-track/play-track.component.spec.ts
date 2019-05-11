import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayTrackComponent, Track } from './play-track.component';
import { FluteSkullkidComponent } from '../images/flute-skullkid/flute-skullkid.component';
import { MockComponent } from 'ng-mocks';
import { PipesDekukidComponent } from '../images/pipes-dekukid/pipes-dekukid.component';
import { DrumsGoronLinkComponent } from '../images/drums-goron-link/drums-goron-link.component';
import { GuitarZoraLinkComponent } from '../images/guitar-zora-link/guitar-zora-link.component';
import { LyreSheikComponent } from '../images/lyre-sheik/lyre-sheik.component';
import { PlayButtonComponent } from '../images/play-button/play-button.component';
import { By } from '@angular/platform-browser';

fdescribe('PlayTrackComponent', () => {

  let component: PlayTrackComponent;
  let fixture: ComponentFixture<PlayTrackComponent>;
  let track: Track;

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
    track = {
      title: 'Knuckles Search Theme',
      duration: '17:53',
      likes: 5,
      tags: ['Hip Hop', 'Video Game'],
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayTrackComponent);
    component = fixture.componentInstance;
    component.track = track;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Play Button', () => {

    let playButtonElement;
    let playIcon;

    beforeEach(() => {
      playButtonElement = fixture.elementRef.nativeElement.querySelector('button') as HTMLButtonElement;
      playIcon = fixture.debugElement.query(By.css('hll-play-button')).componentInstance as PlayButtonComponent;
    });


    it('inverts color scheme when hovered', () => {
      playButtonElement.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      expect(playIcon.invertColors).toBe(true);
    });

    it('restores color scheme when mouse over is lost', () => {
      playButtonElement.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('mouseout'));
      fixture.detectChanges();

      expect(playIcon.invertColors).toBe(false);
    });

    it('inverts color scheme when track is selected', () => {
      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(playIcon.invertColors).toBe(true);
    });
  });
});
