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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PauseButtonComponent } from '../images/pause-button/pause-button.component';

describe('PlayTrackComponent', () => {

  let component: PlayTrackComponent;
  let fixture: ComponentFixture<PlayTrackComponent>;
  let track: Track;
  let playButtonElement: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent(FluteSkullkidComponent),
        MockComponent(PipesDekukidComponent),
        MockComponent(DrumsGoronLinkComponent),
        MockComponent(GuitarZoraLinkComponent),
        MockComponent(LyreSheikComponent),
        MockComponent(PlayButtonComponent),
        MockComponent(PauseButtonComponent),
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

    playButtonElement = fixture.elementRef.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Play Button', () => {

    beforeEach(() => fixture.detectChanges());

    it('shows play icon when unselected', () => {
      expect(_getPlayIcon()).toBeTruthy();
    });

    it('inverts play icon color scheme when hovered', () => {
      playButtonElement.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      expect(_getPlayIcon().invertColors).toBe(true);
    });

    it('restores play icon color scheme when mouse over is lost', () => {
      playButtonElement.dispatchEvent(new Event('mouseover'));
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('mouseout'));
      fixture.detectChanges();

      expect(_getPlayIcon().invertColors).toBe(false);
    });

    it('shows pause icon when track is selected', () => {
      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(_getPauseIcon()).toBeTruthy();
    });

    it('restores play icon when track is selected and then deselected', () => {
      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(_getPlayIcon()).toBeTruthy();
    });

    it('tells the audio element to play when clicked', () => {
      const audioElement = _getAudioElement();
      spyOn(audioElement, 'play');

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(audioElement.play).toHaveBeenCalled();
    });

    it('tells the audio element to pause when clicked twice', () => {
      const audioElement = _getAudioElement();
      spyOn(audioElement, 'play');
      spyOn(audioElement, 'pause');

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(audioElement.pause).toHaveBeenCalled();
    });

    function _getPlayIcon() {
      return fixture.debugElement.query(By.css('hll-play-button')).componentInstance;
    }

    function _getPauseIcon() {
      return fixture.debugElement.query(By.css('hll-pause-button')).componentInstance;
    }
  });

  describe('Volume Slider', () => {

    it(`starts with value equal to '1'`, () => {
      expect(_getVolumeSlider().value).toEqual('1');
      expect(_getAudioElement().volume).toEqual(1);
    });

    it('changes audio element volume on value change', () => {
      const volumeElement = _getVolumeSlider();
      volumeElement.value = '0.55';
      volumeElement.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(_getAudioElement().volume).toEqual(0.55);
    });

    function _getVolumeSlider(): HTMLInputElement {
      return fixture.elementRef.nativeElement.querySelector('.volume-slider');
    }
  });

  describe('Character Icons', () => {
    it('sets flute-skull-kid as play button icon when next random number is between 0 and .2', () => {
      spyOn(Math, 'random').and.returnValue(.1);
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-pipes-dekukid as play button icon when play button clicked and next random number between .2 and .4', () => {
      spyOn(Math, 'random').and.returnValue(.3);
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-drums-goron-link as play button icon when play button clicked and next random number between .4 and .6', () => {
      spyOn(Math, 'random').and.returnValue(.5);
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-guitar-zora-link as play button icon when play button clicked and next random number between .6 and .8', () => {
      spyOn(Math, 'random').and.returnValue(.7);
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeTruthy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeFalsy();
    });

    it('sets hll-lyre-sheik as play button icon when play button clicked and next random number between .8 and 1', () => {
      spyOn(Math, 'random').and.returnValue(.9);
      fixture.detectChanges();

      playButtonElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(fixture.elementRef.nativeElement.querySelector('hll-flute-skullkid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-pipes-dekukid')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-drums-goron-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-guitar-zora-link')).toBeFalsy();
      expect(fixture.elementRef.nativeElement.querySelector('hll-lyre-sheik')).toBeTruthy();
    });

  });

  describe('Track Details', () => {

    beforeEach(() => fixture.detectChanges());

    it('renders track-header with title and duration', () => {
      const trackHeader = fixture.elementRef.nativeElement.querySelector('.track-details .track-header') as HTMLElement;
      expect(trackHeader.innerText).toContain(track.title);
      expect(trackHeader.innerText).toContain(track.duration);
    });

    it('renders track-populatity-tags with heart count and tag list', () => {
      const trackPopularityAndTags = fixture.elementRef.nativeElement.querySelector('.track-details .track-popularity-tags') as HTMLElement;
      expect(trackPopularityAndTags.innerText).toContain(`${track.likes} hearts`);
      track.tags.forEach(tag => {
        expect(trackPopularityAndTags.innerText).toContain(tag);
      });
    });
  });

  function _getAudioElement(): HTMLAudioElement {
    return fixture.elementRef.nativeElement.querySelector('audio');
  }
});
